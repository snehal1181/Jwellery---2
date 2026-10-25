/* ==========================================================================
   AURA ATELIER - BESPOKE RING CUSTOMIZER ENGINE
   Real-time canvas ring renderer & live pricing calculator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const customizerCanvas = document.getElementById('ringPreviewCanvas');
  if (!customizerCanvas) return;

  const ctx = customizerCanvas.getContext('2d');

  // Customizer State
  let ringState = {
    metal: 'yellow-gold', // yellow-gold, rose-gold, platinum, dark-gold
    metalPrice: 3800,
    gemCut: 'oval', // oval, emerald, round, cushion, princess
    gemColor: 'diamond', // diamond, emerald, ruby, sapphire, yellow-diamond
    carat: 3.5,
    sideStones: 'pave', // none, pave, halo
    engraving: ''
  };

  // Metal Configs
  const metals = {
    'yellow-gold': { name: '18k Yellow Gold', color1: '#f8e4a0', color2: '#dfba73', color3: '#8c6827', price: 3800 },
    'rose-gold': { name: '18k Rose Gold', color1: '#f9d1c7', color2: '#e59a8c', color3: '#9e5045', price: 4200 },
    'platinum': { name: 'Platinum 950', color1: '#ffffff', color2: '#d8dedb', color3: '#7a8581', price: 4800 },
    'dark-gold': { name: 'Obsidian Gold', color1: '#595959', color2: '#2b2b2b', color3: '#121212', price: 5400 }
  };

  // Gem Colors
  const gems = {
    'diamond': { name: 'D-Flawless Diamond', mainColor: '#ffffff', glowColor: '#e0f7fa', pricePerCarat: 4500 },
    'emerald': { name: 'Colombian Emerald', mainColor: '#00e676', glowColor: '#1b5e20', pricePerCarat: 3800 },
    'ruby': { name: 'Burmese Ruby', mainColor: '#ff1744', glowColor: '#880e4f', pricePerCarat: 4200 },
    'sapphire': { name: 'Ceylon Sapphire', mainColor: '#2979ff', glowColor: '#0d47a1', pricePerCarat: 3900 },
    'yellow-diamond': { name: 'Canary Yellow Diamond', mainColor: '#ffea00', glowColor: '#f57f17', pricePerCarat: 5200 }
  };

  function renderRing() {
    const w = customizerCanvas.width = customizerCanvas.parentElement.clientWidth;
    const h = customizerCanvas.height = 420;
    const centerX = w / 2;
    const centerY = h / 2 + 30;
    const outerRadius = 110;
    const innerRadius = 85;

    ctx.clearRect(0, 0, w, h);

    const metalCfg = metals[ringState.metal];
    const gemCfg = gems[ringState.gemColor];

    // 1. Draw Ring Band
    ctx.save();
    ctx.lineWidth = outerRadius - innerRadius;
    
    // Metal Gradient
    const metalGrad = ctx.createLinearGradient(centerX - outerRadius, centerY, centerX + outerRadius, centerY);
    metalGrad.addColorStop(0, metalCfg.color1);
    metalGrad.addColorStop(0.5, metalCfg.color2);
    metalGrad.addColorStop(1, metalCfg.color3);

    ctx.strokeStyle = metalGrad;
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 20;

    ctx.beginPath();
    ctx.arc(centerX, centerY, (outerRadius + innerRadius) / 2, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Band Highlight
    ctx.lineWidth = 2;
    ctx.strokeStyle = metalCfg.color1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Draw Side Pavé Stones if selected
    if (ringState.sideStones !== 'none') {
      const stoneCount = ringState.sideStones === 'halo' ? 16 : 10;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 6;

      for (let i = 0; i < stoneCount; i++) {
        const angle = (Math.PI / 8) + (i - stoneCount / 2) * 0.08 - Math.PI / 2;
        const px = centerX + (outerRadius + 2) * Math.cos(angle);
        const py = centerY + (outerRadius + 2) * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(px, py, ringState.sideStones === 'halo' ? 2.5 : 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3. Draw Main Center Gemstone
    const gemY = centerY - outerRadius - 10;
    const baseGemSize = 24 + ringState.carat * 5; // Scale with carats

    ctx.restore();
    ctx.save();
    ctx.translate(centerX, gemY);

    // Gem Glow
    ctx.shadowColor = gemCfg.glowColor;
    ctx.shadowBlur = 25;

    // Gem Color Gradient
    const gemGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, baseGemSize);
    gemGrad.addColorStop(0, '#ffffff');
    gemGrad.addColorStop(0.3, gemCfg.mainColor);
    gemGrad.addColorStop(1, gemCfg.glowColor);

    ctx.fillStyle = gemGrad;
    ctx.strokeStyle = metalCfg.color1;
    ctx.lineWidth = 2;

    ctx.beginPath();
    if (ringState.gemCut === 'oval') {
      ctx.ellipse(0, 0, baseGemSize * 0.8, baseGemSize * 1.1, 0, 0, Math.PI * 2);
    } else if (ringState.gemCut === 'emerald') {
      const wG = baseGemSize * 0.9, hG = baseGemSize * 1.2;
      ctx.rect(-wG / 2, -hG / 2, wG, hG);
    } else if (ringState.gemCut === 'round') {
      ctx.arc(0, 0, baseGemSize, 0, Math.PI * 2);
    } else if (ringState.gemCut === 'princess') {
      const sG = baseGemSize * 1.1;
      ctx.rect(-sG / 2, -sG / 2, sG, sG);
    } else { // cushion
      const sG = baseGemSize * 1.0;
      ctx.roundRect(-sG / 2, -sG / 2, sG, sG, 10);
    }
    ctx.fill();
    ctx.stroke();

    // Facet Light Refraction Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-baseGemSize * 0.5, 0);
    ctx.lineTo(baseGemSize * 0.5, 0);
    ctx.moveTo(0, -baseGemSize * 0.5);
    ctx.lineTo(0, baseGemSize * 0.5);
    ctx.stroke();

    // 4. Render Engraving Text preview inside ring
    if (ringState.engraving.trim() !== '') {
      ctx.restore();
      ctx.save();
      ctx.font = 'italic 12px "Cormorant Garamond", serif';
      ctx.fillStyle = metalCfg.color3;
      ctx.textAlign = 'center';
      ctx.fillText(`"${ringState.engraving}"`, centerX, centerY + innerRadius - 15);
    }

    ctx.restore();

    // Calculate Price
    updatePrice();
  }

  function updatePrice() {
    const metalPrice = metals[ringState.metal].price;
    const gemPrice = gems[ringState.gemColor].pricePerCarat * ringState.carat;
    const sidePrice = ringState.sideStones === 'halo' ? 1600 : (ringState.sideStones === 'pave' ? 950 : 0);
    const engravingPrice = ringState.engraving ? 350 : 0;

    const totalPrice = Math.round(metalPrice + gemPrice + sidePrice + engravingPrice);

    const priceEl = document.getElementById('customizerPrice');
    const caratVal = document.getElementById('caratVal');
    const metalNameEl = document.getElementById('summaryMetal');
    const gemNameEl = document.getElementById('summaryGem');

    if (priceEl) priceEl.textContent = `$${totalPrice.toLocaleString()}`;
    if (caratVal) caratVal.textContent = `${ringState.carat.toFixed(2)} CT`;
    if (metalNameEl) metalNameEl.textContent = metals[ringState.metal].name;
    if (gemNameEl) gemNameEl.textContent = `${gems[ringState.gemColor].name} (${ringState.gemCut.toUpperCase()})`;
  }

  // Event Listeners for UI Selectors
  document.querySelectorAll('[data-metal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-metal]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ringState.metal = btn.dataset.metal;
      renderRing();
    });
  });

  document.querySelectorAll('[data-gem-color]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-gem-color]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ringState.gemColor = btn.dataset.gemColor;
      renderRing();
    });
  });

  document.querySelectorAll('[data-gem-cut]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-gem-cut]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ringState.gemCut = btn.dataset.gemCut;
      renderRing();
    });
  });

  document.querySelectorAll('[data-side]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-side]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ringState.sideStones = btn.dataset.side;
      renderRing();
    });
  });

  const caratRange = document.getElementById('caratRange');
  if (caratRange) {
    caratRange.addEventListener('input', (e) => {
      ringState.carat = parseFloat(e.target.value);
      renderRing();
    });
  }

  const engInput = document.getElementById('engravingInput');
  if (engInput) {
    engInput.addEventListener('input', (e) => {
      ringState.engraving = e.target.value;
      renderRing();
    });
  }

  window.addEventListener('resize', renderRing);
  renderRing();
});
