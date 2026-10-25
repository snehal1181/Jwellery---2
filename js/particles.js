/* ==========================================================================
   AURA ATELIER - GOLDEN PARTICLE CANVAS ANIMATION
   Floating gold dust, diamond sparkle flares, and subtle ambient motion
   ========================================================================== */

(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 1.8 + 0.5;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.speedY = -(Math.random() * 0.3 + 0.05);
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.isSparkle = Math.random() > 0.7;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      this.alpha += Math.sin(Date.now() * this.pulseSpeed) * 0.008;

      if (this.y < 0 || this.x < 0 || this.x > width) {
        this.reset();
        this.y = height + 10;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(0.9, this.alpha));

      if (this.isSparkle) {
        // Draw Diamond Sparkle Star shape
        ctx.fillStyle = '#f6e6b8';
        ctx.shadowColor = '#dfba73';
        ctx.shadowBlur = 8;
        
        ctx.beginPath();
        const r = this.radius * 2;
        ctx.moveTo(this.x, this.y - r);
        ctx.lineTo(this.x + r * 0.3, this.y - r * 0.3);
        ctx.lineTo(this.x + r, this.y);
        ctx.lineTo(this.x + r * 0.3, this.y + r * 0.3);
        ctx.lineTo(this.x, this.y + r);
        ctx.lineTo(this.x - r * 0.3, this.y + r * 0.3);
        ctx.lineTo(this.x - r, this.y);
        ctx.lineTo(this.x - r * 0.3, this.y - r * 0.3);
        ctx.closePath();
        ctx.fill();
      } else {
        // Soft glowing gold dust circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#dfba73';
        ctx.shadowColor = '#dfba73';
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    window.addEventListener('resize', resize);
    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
