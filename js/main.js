/* PNG Jewellers Mega Menu Sidebar Tab Hover Handler & Container Lock */
document.addEventListener("DOMContentLoaded", () => {
  const sidebarTabs = document.querySelectorAll(".png-sidebar-tab");
  sidebarTabs.forEach(tab => {
    const activateTab = function (e) {
      const parentSidebar = this.closest(".png-mega-left-sidebar");
      const parentMegaContainer = this.closest(".png-full-mega-container");
      if (parentSidebar && parentMegaContainer) {
        const siblingTabs = Array.from(parentSidebar.querySelectorAll(".png-sidebar-tab"));
        siblingTabs.forEach(t => t.classList.remove("active"));
        this.classList.add("active");

        const tabIndex = siblingTabs.indexOf(this);
        const panels = parentMegaContainer.querySelectorAll(".png-mega-tab-panel");
        if (panels.length > 0) {
          panels.forEach((p, i) => {
            if (i === tabIndex) {
              p.classList.remove("d-none");
              p.classList.add("d-block");
            } else {
              p.classList.add("d-none");
              p.classList.remove("d-block");
            }
          });
        }
      }
    };

    tab.addEventListener("mouseenter", activateTab);
    tab.addEventListener("click", activateTab);
  });

  // Persistent Mega Menu Container Hover Lock
  const navItems = document.querySelectorAll(".png-nav-item-full");
  navItems.forEach(item => {
    let hideTimer = null;
    const megaContainer = item.querySelector(".png-full-mega-container");
    if (!megaContainer) return;

    const showContainer = () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      megaContainer.classList.add("mega-open");
    };

    const hideContainer = () => {
      hideTimer = setTimeout(() => {
        megaContainer.classList.remove("mega-open");
      }, 300); // 300ms grace period so container stays open stably until cursor leaves
    };

    item.addEventListener("mouseenter", showContainer);
    item.addEventListener("mouseleave", hideContainer);
    megaContainer.addEventListener("mouseenter", showContainer);
    megaContainer.addEventListener("mouseleave", hideContainer);
  });
});

/// Shared State & Expanded Luxury Product Catalog Data (All Items matching Mega Menu Dropdowns with Sequence Mapping)
const AURA_CATALOG = [
  // --- DIAMOND MODAL ITEMS (18 items) ---
  { id: 101, title: "Sovereign Solitaire Oval Diamond Ring", category: "rings", categories: ["rings", "diamonds", "solitaires"], seq: { diamonds: 1, rings: 1, all: 1 }, metal: "18k Rose Gold", gemstone: "Diamond", price: 18900, carat: "3.20 Carats", image: "images/luxeora_hero_rings.jpg", badge: "GIA Certified", desc: "VVS1 clarity oval brilliant solitaire mounted on a micro-pave diamond band in rose gold." },
  { id: 504, title: "GIA Certified 5.0ct Round Solitaire", category: "solitaires", categories: ["solitaires", "diamonds"], seq: { diamonds: 2, solitaires: 4, all: 25 }, metal: "Platinum", gemstone: "Diamond", price: 42000, carat: "5.00 Carats", image: "images/hero_ring.jpg", badge: "Super Ideal Cut", desc: "Rare D-color, Flawless clarity 5.0 carat round brilliant solitaire." },
  { id: 507, title: "Emerald Cut Solitaire Pendant", category: "solitaires", categories: ["solitaires", "diamonds", "necklaces"], seq: { diamonds: 3, solitaires: 7, necklaces: 3, all: 27 }, metal: "Platinum", gemstone: "Diamond", price: 16800, carat: "3.80 Carats", image: "images/luxeora_hero_emerald.jpg", badge: "VVS1 Solitaire", desc: "Step-cut emerald diamond suspended from a silk-smooth chain." },
  { id: 501, title: "Solitaire Cushion Cut Diamond Ring", category: "solitaires", categories: ["solitaires", "diamonds"], seq: { diamonds: 4, solitaires: 1, all: 26 }, metal: "Platinum & 18k White Gold", gemstone: "Diamond", price: 24500, carat: "4.50 Carats", image: "images/hero_luxeora_necklace.jpg", badge: "Solitaire Special", desc: "Flawless cushion-cut natural diamond with double claw prongs." },
  { id: 102, title: "Eternity Marquise Diamond Pave Band", category: "rings", categories: ["rings", "diamonds"], seq: { diamonds: 5, rings: 5, all: 2 }, metal: "18k Yellow Gold", gemstone: "Diamond", price: 8900, carat: "3.00 Carats", image: "images/cat_rings.jpg", badge: "Eternity Band", desc: "Continuous full eternity band featuring East-West set marquise cut diamonds." },
  { id: 502, title: "Radiant Cut Yellow Diamond Solitaire", category: "solitaires", categories: ["solitaires", "diamonds", "rings"], seq: { diamonds: 6, solitaires: 2, rings: 4, all: 30 }, metal: "18k Yellow Gold", gemstone: "Diamond", price: 36000, carat: "4.20 Carats", image: "images/diamond_watch.jpg", badge: "Fancy Yellow", desc: "Natural fancy intense yellow radiant cut diamond solitaire." },
  { id: 307, title: "Celestial Diamond Stud Earrings", category: "earrings", categories: ["earrings", "diamonds"], seq: { diamonds: 7, earrings: 7, all: 15 }, metal: "18k White Gold", gemstone: "Diamond", price: 7800, carat: "2.00 Carats", image: "images/cat_earrings.jpg", badge: "Best Seller", desc: "Classic 6-prong round solitaire diamond studs with screw-back clips." },
  { id: 607, title: "Chandelier Diamond & Ruby Drops", category: "earrings", categories: ["earrings", "diamonds"], seq: { diamonds: 8, all: 14 }, metal: "18k Rose Gold", gemstone: "Ruby", price: 14500, carat: "5.20 Carats", image: "images/emerald_earrings.jpg", badge: "Red Carpet Collection", desc: "Multi-tiered chandelier drop earrings adorned with rubies and diamonds." },
  { id: 309, title: "Inside-Out Diamond Hoops & Huggies", category: "earrings", categories: ["earrings", "diamonds"], seq: { diamonds: 9, earrings: 9 }, metal: "18k Yellow Gold", gemstone: "Diamond", price: 4900, carat: "1.50 Carats", image: "images/luxeora_hero_rings.jpg", badge: "Daily Elegance", desc: "Inside-out round brilliant diamond huggie hoops crafted in yellow gold." },
  { id: 311, title: "Marquise Diamond Cluster Dangles", category: "earrings", categories: ["earrings", "diamonds"], seq: { diamonds: 10, earrings: 11, all: 18 }, metal: "18k White Gold", gemstone: "Diamond", price: 11500, carat: "3.80 Carats", image: "images/diamond_watch.jpg", badge: "Atelier Couture", desc: "Fluid cluster dangles featuring marquise diamonds in floral motif." },
  { id: 308, title: "Emerald Cut Diamond Studs", category: "earrings", categories: ["earrings", "diamonds"], seq: { diamonds: 11, earrings: 8 }, metal: "Platinum 950", gemstone: "Diamond", price: 14200, carat: "3.00 Carats", image: "images/hero_ring.jpg", badge: "VVS Flawless", desc: "Sophisticated step-cut emerald diamond studs set in 4-prong platinum." },
  { id: 310, title: "Solitaire Pear Cut Diamond Drops", category: "earrings", categories: ["earrings", "diamonds"], seq: { diamonds: 12, earrings: 10 }, metal: "18k Rose Gold", gemstone: "Diamond", price: 15800, carat: "4.20 Carats", image: "images/cat_rings.jpg", badge: "GIA Certified", desc: "GIA certified pear cut solitaire drops hanging from delicate diamond bars." },
  { id: 408, title: "Princess Cut Diamond Cuff Bangle", category: "bracelets", categories: ["bracelets", "diamonds"], seq: { diamonds: 13, bracelets: 8 }, metal: "18k White Gold", gemstone: "Diamond", price: 17400, carat: "6.80 Carats", image: "images/cat_bangles.jpg", badge: "High Jewelry", desc: "Hinged cuff bangle channel-set with princess cut diamonds." },
  { id: 206, title: "Cascade Diamond Tennis Riviera Necklace", category: "necklaces", categories: ["necklaces", "diamonds"], seq: { diamonds: 14, necklaces: 4, all: 8 }, metal: "Platinum 950", gemstone: "Diamond", price: 38900, carat: "18.50 Carats", image: "images/hero_luxeora_necklace.jpg", badge: "High Jewelry", desc: "Graduated round brilliant cut diamonds forming a seamless riviera necklace." },
  { id: 405, title: "Classic Round Diamond Tennis Bracelet", category: "bracelets", categories: ["bracelets", "diamonds"], seq: { diamonds: 15, bracelets: 5, all: 21 }, metal: "18k White Gold", gemstone: "Diamond", price: 14900, carat: "7.00 Carats", image: "images/luxeora_hero_rings.jpg", badge: "Iconic Classic", desc: "Flexible line bracelet of four-prong set round brilliant diamonds." },
  { id: 407, title: "Emerald Cut Diamond Line Bracelet", category: "bracelets", categories: ["bracelets", "diamonds"], seq: { diamonds: 16, bracelets: 7 }, metal: "Platinum 950", gemstone: "Diamond", price: 28500, carat: "12.00 Carats", image: "images/luxeora_hero_emerald.jpg", badge: "VVS Solitaire", desc: "Continuous row of step-cut emerald diamonds set in platinum." },
  { id: 409, title: "Rose Gold Micro-Pave Diamond Cuff", category: "bracelets", categories: ["bracelets", "diamonds"], seq: { diamonds: 17, bracelets: 9, all: 23 }, metal: "18k Rose Gold", gemstone: "Diamond", price: 8800, carat: "3.40 Carats", image: "images/cat_rings.jpg", badge: "Modern Luxury", desc: "Sleek open-cuff bracelet featuring five rows of micro-pave diamonds." },
  { id: 410, title: "Pear Cut Diamond Open Hinged Bangle", category: "bracelets", categories: ["bracelets", "diamonds"], seq: { diamonds: 18, bracelets: 10 }, metal: "18k Yellow Gold", gemstone: "Diamond", price: 19500, carat: "5.50 Carats", image: "images/hero_ring.jpg", badge: "Haute Couture", desc: "Dual pear-cut diamond terminals meeting at an open hinged cuff." },

  // --- GOLD MODAL ITEMS (13 items) ---
  { id: 204, title: "Royal Temple Antiqued Gold Choker", category: "necklaces", categories: ["necklaces", "gold"], seq: { gold: 1, necklaces: 7, all: 11 }, metal: "22k Antique Gold", gemstone: "Gold", price: 21000, carat: "22KT Gold Purity", image: "images/cat_necklaces.jpg", badge: "Heritage Temple Gold", desc: "Intricately detailed antique temple gold choker set embedded with natural rubies." },
  { id: 601, title: "Temple Lakshmi Gold Pendant", category: "gold", categories: ["gold"], seq: { gold: 2, all: 28 }, metal: "22k Yellow Gold", gemstone: "Gold", price: 7900, carat: "22KT BIS", image: "images/hero_burgundy_necklace.jpg", badge: "Devotional Temple", desc: "Embossed Goddess Lakshmi gold coin pendant on heavy chain." },
  { id: 313, title: "22KT Floral Gold Jhumka Earrings", category: "earrings", categories: ["earrings", "gold"], seq: { gold: 3, earrings: 13, all: 30 }, metal: "22k Gold", gemstone: "Gold", price: 7600, carat: "22KT BIS", image: "images/cat_earrings.jpg", badge: "Temple Gold", desc: "Intricate filigree mesh 22k gold jhumkas with hanging bell drops." },
  { id: 602, title: "22KT Solid Gold Signet Ring", category: "gold", categories: ["gold"], seq: { gold: 4, all: 32 }, metal: "22k Gold", gemstone: "Gold", price: 4800, carat: "22KT BIS", image: "images/cat_rings.jpg", badge: "Signet Gold", desc: "Heavy solid 22k gold polished signet ring with high-luster finish." },
  { id: 603, title: "Solid 22KT Gold Kamarbandh", category: "gold", categories: ["gold"], seq: { gold: 5, all: 29 }, metal: "22k Yellow Gold", gemstone: "Gold", price: 34000, carat: "22KT BIS", image: "images/bg_collections_hero.jpg", badge: "Bridal Heirloom", desc: "Traditional 22k gold waist ornament for grand celebrations." },
  { id: 604, title: "22KT Gold Figaro Neck Chain", category: "gold", categories: ["gold"], seq: { gold: 6 }, metal: "22k Yellow Gold", gemstone: "Gold", price: 5800, carat: "22KT BIS", image: "images/artisan_atwork.jpg", badge: "Classic Gold", desc: "High-polish 3+1 figaro link chain in pure 22k gold." },
  { id: 401, title: "22KT Handcrafted Gold Heritage Bangles", category: "bracelets", categories: ["bracelets", "gold"], seq: { gold: 7, bracelets: 1, all: 19 }, metal: "22k Gold", gemstone: "Gold", price: 9500, carat: "22KT BIS Hallmarked", image: "images/cat_bangles.jpg", badge: "BIS Hallmarked", desc: "Exquisite pair of traditional filigree 22KT gold bangles." },
  { id: 402, title: "Heritage Kada Thick 22k Gold Bangle", category: "bracelets", categories: ["bracelets", "gold"], seq: { gold: 8, bracelets: 2, all: 22 }, metal: "22k Gold", gemstone: "Gold", price: 11200, carat: "22KT BIS", image: "images/bg_collections_hero.jpg", badge: "Royal Kada", desc: "Solid 22k gold kada bangle embellished with traditional embossed patterns." },
  { id: 403, title: "Antique Kundan & Pearl Bangle Set", category: "bracelets", categories: ["bracelets", "gold"], seq: { gold: 9, bracelets: 3 }, metal: "22k Antique Gold", gemstone: "Gold", price: 13500, carat: "22KT BIS", image: "images/hero_burgundy_necklace.jpg", badge: "Bridal Set", desc: "Set of 4 traditional gold bangles adorned with uncut stones and pearls." },
  { id: 205, title: "Solid 22KT Gold Rope Chain", category: "necklaces", categories: ["necklaces", "gold"], seq: { gold: 10, necklaces: 10 }, metal: "22k Yellow Gold", gemstone: "Gold", price: 6400, carat: "22KT BIS Certified", image: "images/cat_bangles.jpg", badge: "Everyday Luxury", desc: "Heavy diamond-cut 22KT gold rope chain with high-luster finish." },
  { id: 605, title: "24KT Minted Gold Coin (10g Bullion)", category: "gold", categories: ["gold"], seq: { gold: 11 }, metal: "24k Pure Gold", gemstone: "Gold", price: 3200, carat: "999.9 Purity", image: "images/boutique_interior.jpg", badge: "Investment Pure Gold", desc: "Swiss-certified 999.9 pure 24KT gold bullion coin." },
  { id: 606, title: "24KT Minted Gold Bar (50g Reserve)", category: "gold", categories: ["gold"], seq: { gold: 12, all: 31 }, metal: "24k Pure Gold", gemstone: "Gold", price: 15800, carat: "999.9 Purity", image: "images/artisan_atwork.jpg", badge: "Bullion Reserve", desc: "50g Swiss 24KT pure gold investment bar with assay certificate." },
  { id: 608, title: "Solid 22KT Gold Heavy Rope Chain", category: "gold", categories: ["gold"], seq: { gold: 13 }, metal: "22k Yellow Gold", gemstone: "Gold", price: 6400, carat: "22KT BIS Certified", image: "images/cat_necklaces.jpg", badge: "Heavy Rope Chain", desc: "Solid diamond-cut 22KT gold heavy rope chain with high-luster finish." },

  // --- EARRINGS MODAL ITEMS (18 items) ---
  { id: 301, title: "Imperial Emerald Drop Earrings", category: "earrings", categories: ["earrings"], seq: { earrings: 1, all: 13 }, metal: "Platinum", gemstone: "Emerald", price: 12400, carat: "6.50 Carats", image: "images/luxeora_hero_emerald.jpg", badge: "Signature Drop", desc: "Double-halo diamond earrings holding pear-cut Colombian emerald drops." },
  { id: 302, title: "Colombian Emerald & Diamond Pear Dangles", category: "earrings", categories: ["earrings"], seq: { earrings: 2, all: 14 }, metal: "18k Yellow Gold", gemstone: "Emerald", price: 14800, carat: "5.80 Carats", image: "images/emerald_earrings.jpg", badge: "Haute Couture", desc: "Vibrant Colombian emerald pear cut drop dangles set in yellow gold." },
  { id: 303, title: "Oval Sapphire & Diamond Halo Studs", category: "earrings", categories: ["earrings"], seq: { earrings: 3 }, metal: "18k White Gold", gemstone: "Sapphire", price: 9600, carat: "4.00 Carats", image: "images/sapphire_bracelet.jpg", badge: "Ceylon Blue", desc: "Oval deep blue Ceylon sapphire studs framed by micro-pave white diamonds." },
  { id: 304, title: "Burmese Ruby Teardrop Earrings", category: "earrings", categories: ["earrings"], seq: { earrings: 4 }, metal: "18k Yellow Gold", gemstone: "Ruby", price: 13500, carat: "5.20 Carats", image: "images/ruby_pendant.jpg", badge: "Royal Ruby", desc: "Teardrop Burmese ruby earrings with diamond micro-prong halo." },
  { id: 305, title: "Solitaire Pear Cut Emerald Drops", category: "earrings", categories: ["earrings"], seq: { earrings: 5 }, metal: "Platinum 950", gemstone: "Emerald", price: 16200, carat: "6.00 Carats", image: "images/cat_earrings.jpg", badge: "Gemstone Solitaire", desc: "Pear cut solitaire emeralds suspended from diamond-encrusted hooks." },
  { id: 306, title: "L'Étoile Emerald Chandelier Drops", category: "earrings", categories: ["earrings"], seq: { earrings: 6 }, metal: "18k White Gold", gemstone: "Emerald", price: 18900, carat: "7.50 Carats", image: "images/luxeora_hero_necklace.jpg", badge: "Masterpiece", desc: "Multi-tiered emerald and diamond chandelier drop earrings." },
  { id: 312, title: "Princess Cut Solitaire Diamond Studs", category: "earrings", categories: ["earrings"], seq: { earrings: 12 }, metal: "18k White Gold", gemstone: "Diamond", price: 9200, carat: "2.50 Carats", image: "images/hero_luxeora_necklace.jpg", badge: "Classic Studs", desc: "Brilliant princess cut solitaire studs set in 4-prong basket settings." },
  { id: 314, title: "Antiqued Gold Kundan Chandbalis", category: "earrings", categories: ["earrings", "gold"], seq: { earrings: 14 }, metal: "22k Antique Gold", gemstone: "Gold", price: 10400, carat: "22KT BIS", image: "images/hero_burgundy_necklace.jpg", badge: "Kundan Art", desc: "Traditional crescent chandbali earrings set with uncut Kundan and pearl drops." },
  { id: 315, title: "22KT Filigree Floral Gold Jhumka", category: "earrings", categories: ["earrings", "gold"], seq: { earrings: 15 }, metal: "22k Gold", gemstone: "Gold", price: 7600, carat: "22KT BIS", image: "images/cat_bangles.jpg", badge: "Floral Filigree", desc: "Intricate filigree floral motif gold jhumka earrings." },
  { id: 316, title: "Heritage Meenakari Peacock Jhumka", category: "earrings", categories: ["earrings"], seq: { earrings: 16 }, metal: "22k Gold", gemstone: "Gold", price: 9800, carat: "22KT BIS", image: "images/bg_collections_hero.jpg", badge: "Meenakari Art", desc: "Peacock motif enamelled 22k gold jhumka earrings with ruby drops." },
  { id: 317, title: "Traditional South Sea Pearl Gold Drop", category: "earrings", categories: ["earrings"], seq: { earrings: 17 }, metal: "18k Yellow Gold", gemstone: "Pearl", price: 6500, carat: "Lustrous Pearl", image: "images/boutique_interior.jpg", badge: "South Sea Pearl", desc: "Golden South Sea cultured pearl drops capped with diamond-pave leaves." },
  { id: 318, title: "22KT Antique Temple Gold Ear Tops", category: "earrings", categories: ["earrings"], seq: { earrings: 18 }, metal: "22k Antique Gold", gemstone: "Gold", price: 5900, carat: "22KT BIS", image: "images/artisan_atwork.jpg", badge: "Antique Tops", desc: "Classic round temple gold ear tops embossed with floral engravings." },

  // --- RINGS MODAL ITEMS (11 items) ---
  { id: 107, title: "Cushion Brilliant Solitaire Pave Ring", category: "rings", categories: ["rings", "solitaires"], seq: { rings: 2 }, metal: "Platinum 950", gemstone: "Diamond", price: 26400, carat: "4.00 Carats", image: "images/cat_rings.jpg", badge: "Solitaire Special", desc: "Ideal cushion cut center solitaire elevated by hidden halo and pavé band." },
  { id: 108, title: "Pear Cut Solitaire Engagement Ring", category: "rings", categories: ["rings", "solitaires"], seq: { rings: 3 }, metal: "18k Yellow Gold", gemstone: "Diamond", price: 21500, carat: "3.50 Carats", image: "images/hero_ring.jpg", badge: "Solitaire Engagement", desc: "Elongated pear cut solitaire diamond ring set on sloped shank." },
  { id: 110, title: "Triple Row Diamond Eternity Band", category: "rings", categories: ["rings"], seq: { rings: 6 }, metal: "18k White Gold", gemstone: "Diamond", price: 12800, carat: "4.50 Carats", image: "images/luxeora_hero_rings.jpg", badge: "High Jewelry", desc: "Three seamless rows of round brilliant diamonds set in lustrous 18k white gold." },
  { id: 109, title: "Rose Gold Marquise Stacking Ring", category: "rings", categories: ["rings"], seq: { rings: 7 }, metal: "18k Rose Gold", gemstone: "Diamond", price: 5400, carat: "1.80 Carats", image: "images/hero_ring.jpg", badge: "Everyday Luxury", desc: "Delicate stacking band set with alternating marquise and round diamonds." },
  { id: 103, title: "Royal Emerald & Diamond Cocktail Ring", category: "rings", categories: ["rings"], seq: { rings: 8, all: 6 }, metal: "18k Yellow Gold", gemstone: "Emerald", price: 19800, carat: "5.60 Carats", image: "images/luxeora_hero_emerald.jpg", badge: "Cocktail Masterpiece", desc: "Oval Colombian emerald centerpiece framed by ballerina baguette diamonds." },
  { id: 104, title: "Imperial Ruby Solitaire Halo Ring", category: "rings", categories: ["rings"], seq: { rings: 9, all: 4 }, metal: "18k White Gold", gemstone: "Ruby", price: 14500, carat: "4.10 Carats", image: "images/ruby_pendant.jpg", badge: "Burmese Ruby", desc: "Vibrant pigeon blood oval ruby encircled by micro-prong brilliant cut diamonds." },
  { id: 105, title: "Sapphire Velvet Royal Crown Ring", category: "rings", categories: ["rings"], seq: { rings: 10, all: 5 }, metal: "Platinum 950", gemstone: "Sapphire", price: 21200, carat: "6.20 Carats", image: "images/sapphire_bracelet.jpg", badge: "Royal Collection", desc: "Deep Ceylon royal sapphire flanked by tapered baguette diamond side stones." },
  { id: 106, title: "Vintage Heritage Kundan Gold Ring", category: "rings", categories: ["rings", "gold"], seq: { rings: 11 }, metal: "22k Gold", gemstone: "Gold", price: 6800, carat: "22KT BIS", image: "images/hero_burgundy_necklace.jpg", badge: "Heritage Kundan", desc: "Traditional Kundan set gold ring with intricate floral engraving." },

  // --- NECKLACES MODAL ITEMS (10 items) ---
  { id: 201, title: "L'Étoile Emerald & Diamond Masterpiece", category: "necklaces", categories: ["necklaces"], seq: { necklaces: 1, all: 7 }, metal: "18k Yellow Gold", gemstone: "Emerald", price: 34500, carat: "14.80 Carats", image: "images/luxeora_hero_necklace.jpg", badge: "Haute Joaillerie", desc: "A breathtaking royal emerald center stone framed by hand-cut marquise diamonds." },
  { id: 207, title: "Imperial Sapphire Halo Pendant", category: "necklaces", categories: ["necklaces"], seq: { necklaces: 2 }, metal: "18k White Gold", gemstone: "Sapphire", price: 11400, carat: "3.50 Carats", image: "images/sapphire_bracelet.jpg", badge: "Ceylon Blue", desc: "Deep Ceylon sapphire surrounded by double cushion halo of brilliant diamonds." },
  { id: 210, title: "Floral Diamond Cluster Statement Necklace", category: "necklaces", categories: ["necklaces"], seq: { necklaces: 5, all: 10 }, metal: "18k Rose Gold", gemstone: "Diamond", price: 22400, carat: "8.90 Carats", image: "images/hero_necklace.jpg", badge: "Signature Floral", desc: "Interlocking diamond flowers forming a regal neckline curve." },
  { id: 202, title: "Crown Royal Ruby & Diamond Pendant", category: "necklaces", categories: ["necklaces"], seq: { necklaces: 6, all: 12 }, metal: "18k Yellow Gold", gemstone: "Ruby", price: 15600, carat: "4.10 Carats", image: "images/ruby_pendant.jpg", badge: "Exclusive Atelier", desc: "Pigeon blood Burmese ruby surrounded by a sunburst halo of white diamonds." },
  { id: 203, title: "Bridal Heritage Kundan Set", category: "necklaces", categories: ["necklaces", "gold"], seq: { necklaces: 8, all: 9 }, metal: "22k Gold & Gemstones", gemstone: "Emerald", price: 28900, carat: "22KT Certified", image: "images/hero_burgundy_necklace.jpg", badge: "Royal Bridal", desc: "Grand bridal necklace set featuring hand-set Uncut Kundan polki and pearls." },
  { id: 208, title: "Polki Uncut Diamond Heritage Choker", category: "necklaces", categories: ["necklaces"], seq: { necklaces: 9 }, metal: "22k Yellow Gold", gemstone: "Diamond", price: 24500, carat: "22KT BIS", image: "images/bg_collections_hero.jpg", badge: "Bridal Heirloom", desc: "Uncut polki diamonds intricately set in 22k gold with emerald drop tassels." },

  // --- BANGLES & BRACELETS MODAL ITEMS (10 items) ---
  { id: 404, title: "Midnight Sapphire Tennis Bracelet", category: "bracelets", categories: ["bracelets"], seq: { bracelets: 4, all: 20 }, metal: "Platinum", gemstone: "Sapphire", price: 11800, carat: "8.40 Carats", image: "images/sapphire_bracelet.jpg", badge: "High Jewelry", desc: "Alternating oval deep blue Ceylon sapphires and round brilliant cut diamonds." },
  { id: 406, title: "Burmese Ruby & Diamond Tennis Bracelet", category: "bracelets", categories: ["bracelets"], seq: { bracelets: 6, all: 24 }, metal: "18k Yellow Gold", gemstone: "Ruby", price: 16200, carat: "6.50 Carats", image: "images/ruby_pendant.jpg", badge: "Ruby Atelier", desc: "Pigeon blood rubies interspersed with brilliant white accent diamonds." },

  // --- SOLITAIRES MODAL ITEMS (9 items) ---
  { id: 503, title: "Asscher Cut Vintage Solitaire Ring", category: "solitaires", categories: ["solitaires"], seq: { solitaires: 3 }, metal: "Platinum 950", gemstone: "Diamond", price: 31000, carat: "4.30 Carats", image: "images/cat_rings.jpg", badge: "Art Deco", desc: "Royal Asscher cut solitaire framed by tapered baguette side stones." },
  { id: 505, title: "Oval Brilliant Cut Solitaire Ring", category: "solitaires", categories: ["solitaires"], seq: { solitaires: 5, all: 28 }, metal: "18k Rose Gold", gemstone: "Diamond", price: 21500, carat: "3.50 Carats", image: "images/luxeora_hero_rings.jpg", badge: "GIA Certified", desc: "VVS1 clarity oval brilliant solitaire mounted on hidden halo band." },
  { id: 506, title: "Heart Cut Solitaire Diamond Ring", category: "solitaires", categories: ["solitaires"], seq: { solitaires: 6 }, metal: "18k Rose Gold", gemstone: "Diamond", price: 29800, carat: "3.80 Carats", image: "images/ruby_pendant.jpg", badge: "Rare Heart Cut", desc: "Perfectly proportioned heart-shaped solitaire diamond ring." },
  { id: 508, title: "Pear Cut Solitaire Diamond Ring", category: "solitaires", categories: ["solitaires"], seq: { solitaires: 8, all: 29 }, metal: "Platinum 950", gemstone: "Diamond", price: 27800, carat: "4.00 Carats", image: "images/cat_rings.jpg", badge: "Pear Solitaire", desc: "Elongated pear cut diamond on a slender platinum pavé band." },
  { id: 509, title: "Marquise Cut Solitaire Platinum Ring", category: "solitaires", categories: ["solitaires"], seq: { solitaires: 9 }, metal: "Platinum 950", gemstone: "Diamond", price: 25400, carat: "3.90 Carats", image: "images/diamond_watch.jpg", badge: "Marquise Solitaire", desc: "Classic Marquise cut solitaire set in platinum." }
];

// Initialize Cart and Wishlist from localStorage
// Initialize Cart, Wishlist, and Default Theme (Light Mode Default)
let auraCart = JSON.parse(localStorage.getItem('aura_cart') || '[]');
let auraWishlist = JSON.parse(localStorage.getItem('aura_wishlist') || '[]');

// Always Light Mode as per Luxeora design requirement
let currentTheme = 'light';
localStorage.setItem('aura_theme', 'light');

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initNavbarScroll();
  initCursorSparkle();
  updateCartBadgeCount();
  initWishlistState();
  initCartDrawer();
  initStatCounters();
  initCharacterReveal();
  initScrollRevealAnimations();
});

/* Light Theme Engine Only */
function initThemeEngine() {
  document.documentElement.setAttribute('data-theme', 'light');
}

function toggleTheme() {
  // Theme locked to Light Mode as requested
  document.documentElement.setAttribute('data-theme', 'light');
}

/* Navbar Scroll Effect */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-luxury');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* Custom Cursor Sparkle */
function initCursorSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'cursor-sparkle';
  document.body.appendChild(sparkle);

  window.addEventListener('mousemove', (e) => {
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
  });
}

/* Toast Notification Utility */
function showLuxuryToast(message, icon = 'bi-gem') {
  let container = document.querySelector('.luxury-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'luxury-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'luxury-toast';
  toast.innerHTML = `
    <i class="bi ${icon} text-gold fs-5"></i>
    <span style="font-size:0.9rem; font-weight:500;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* Wishlist Management */
function toggleWishlist(productId, btnElement) {
  const index = auraWishlist.indexOf(productId);
  if (index > -1) {
    auraWishlist.splice(index, 1);
    if (btnElement) {
      btnElement.classList.remove('active');
      const icon = btnElement.querySelector('i');
      if (icon) {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
      }
    }
    showLuxuryToast('Item removed from your Private Wishlist', 'bi-heart');
  } else {
    auraWishlist.push(productId);
    if (btnElement) {
      btnElement.classList.add('active');
      const icon = btnElement.querySelector('i');
      if (icon) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
      }
    }
    showLuxuryToast('Item added to your Private Wishlist', 'bi-heart-fill');
  }
  localStorage.setItem('aura_wishlist', JSON.stringify(auraWishlist));
}

function initWishlistState() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const icon = btn.querySelector('i');
    if (auraWishlist.includes(id)) {
      btn.classList.add('active');
      if (icon) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
      }
    } else {
      btn.classList.remove('active');
      if (icon) {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
      }
    }
  });
}

/* Cart & Slide-Over Drawer Logic */
function addToCart(productId, qty = 1) {
  const loggedInUser = JSON.parse(localStorage.getItem('aura_logged_in_user') || 'null');
  if (!loggedInUser) {
    localStorage.setItem('aura_pending_add_to_cart', JSON.stringify({ productId, qty }));
    openAuthModal('login', 'Please Sign In or Register to add items to your shopping bag.');
    return;
  }

  const product = AURA_CATALOG.find(p => p.id === productId);
  if (!product) return;

  const existingItem = auraCart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    auraCart.push({ ...product, quantity: qty });
  }

  localStorage.setItem('aura_cart', JSON.stringify(auraCart));
  updateCartBadgeCount();
  renderCartDrawerContent();
  if (typeof renderCartPage === 'function') {
    renderCartPage();
  }
  openCartDrawer();
  showLuxuryToast(`Added "${product.title}" to your Shopping Bag`, 'bi-bag-check');
}

function updateCartQty(productId, delta) {
  const item = auraCart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    auraCart = auraCart.filter(i => i.id !== productId);
  }
  localStorage.setItem('aura_cart', JSON.stringify(auraCart));
  updateCartBadgeCount();
  renderCartDrawerContent();
  if (typeof renderCartPage === 'function') {
    renderCartPage();
  }
}

function removeFromCart(productId) {
  auraCart = auraCart.filter(item => item.id !== productId);
  localStorage.setItem('aura_cart', JSON.stringify(auraCart));
  updateCartBadgeCount();
  renderCartDrawerContent();
  if (typeof renderCartPage === 'function') {
    renderCartPage();
  }
}

function updateCartBadgeCount() {
  const badges = document.querySelectorAll('.badge-cart');
  const totalCount = auraCart.reduce((sum, item) => sum + item.quantity, 0);
  badges.forEach(b => {
    b.textContent = totalCount;
  });
}

function initCartDrawer() {
  const drawerHtml = `
    <div class="cart-drawer-backdrop" id="cartBackdrop" onclick="closeCartDrawer()"></div>
    <div class="cart-drawer" id="cartDrawer">
      <div class="cart-drawer-header">
        <h5 class="m-0 font-serif text-gold"><i class="bi bi-bag-heart me-2"></i> Your Shopping Bag</h5>
        <button type="button" class="btn-close btn-close-white" onclick="closeCartDrawer()"></button>
      </div>
      <div class="cart-drawer-body" id="cartDrawerBody">
        <!-- Cart Items Dynamic Render -->
      </div>
      <div class="cart-drawer-footer" id="cartDrawerFooter">
        <!-- Subtotal and Checkout -->
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', drawerHtml);
}

function openCartDrawer() {
  renderCartDrawerContent();
  document.getElementById('cartBackdrop')?.classList.add('show');
  document.getElementById('cartDrawer')?.classList.add('show');
}

function closeCartDrawer() {
  document.getElementById('cartBackdrop')?.classList.remove('show');
  document.getElementById('cartDrawer')?.classList.remove('show');
}

function renderCartDrawerContent() {
  const body = document.getElementById('cartDrawerBody');
  const footer = document.getElementById('cartDrawerFooter');
  if (!body || !footer) return;

  if (auraCart.length === 0) {
    body.innerHTML = `
      <div class="text-center py-5 text-muted">
        <i class="bi bi-bag-x display-3 text-gold opacity-50 d-block mb-3"></i>
        <p class="fs-5 font-serif text-main">Your shopping bag is currently empty.</p>
        <a href="collections.html" class="btn btn-gold-outline btn-sm mt-2" onclick="closeCartDrawer()">Explore Collections</a>
      </div>
    `;
    footer.innerHTML = '';
    return;
  }

  let subtotal = 0;
  body.innerHTML = auraCart.map(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <div class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom border-secondary border-opacity-25">
        <img src="${item.image}" alt="${item.title}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 10px; border: 1px solid var(--gold-border);">
        <div class="flex-grow-1">
          <h6 class="m-0 font-serif text-main fw-semibold" style="font-size: 0.95rem;">${item.title}</h6>
          <small class="text-muted d-block" style="font-size: 0.78rem;">${item.metal || ''} ${item.carat ? '• ' + item.carat : ''}</small>
          <div class="text-gold mt-1 fw-bold font-serif">$${itemTotal.toLocaleString()}</div>
        </div>
        <div class="d-flex flex-column align-items-end gap-2">
          <button class="btn btn-link text-danger p-0 border-0" onclick="removeFromCart(${item.id})" title="Remove item">
            <i class="bi bi-trash fs-6"></i>
          </button>
          <div class="cart-qty-pill" style="padding: 1px 4px;">
            <button class="cart-qty-btn" style="width: 22px; height: 22px; font-size: 0.75rem;" onclick="updateCartQty(${item.id}, -1)">-</button>
            <span class="cart-qty-val" style="min-width: 20px; font-size: 0.82rem;">${item.quantity}</span>
            <button class="cart-qty-btn" style="width: 22px; height: 22px; font-size: 0.75rem;" onclick="updateCartQty(${item.id}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  footer.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <span class="text-muted text-uppercase small" style="letter-spacing: 1px;">Subtotal</span>
      <span class="fs-4 font-serif text-gold fw-bold">$${subtotal.toLocaleString()}</span>
    </div>
    <div class="d-grid gap-2">
      <a href="cart.html" class="btn btn-gold w-100 py-2.5 fw-semibold" onclick="closeCartDrawer()">View Shopping Bag & Checkout</a>
    </div>
  `;
}

/* Quick View Modal Handler */
function openQuickView(productId) {
  const item = AURA_CATALOG.find(p => p.id === productId);
  if (!item) return;

  let modalEl = document.getElementById('quickViewModal');
  if (!modalEl) {
    const modalHtml = `
      <div class="modal fade" id="quickViewModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-emerald-dark border-gold text-main">
            <div class="modal-header border-bottom border-secondary border-opacity-25">
              <span class="badge-luxury" id="qvBadge">Haute Joaillerie</span>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
              <div class="row align-items-center g-4">
                <div class="col-md-6 text-center">
                  <div class="card-img-wrapper" style="aspect-ratio: 1/1;">
                    <img id="qvImage" src="" alt="Jewelry Item" class="rounded">
                  </div>
                </div>
                <div class="col-md-6">
                  <h3 class="font-serif text-gold mb-2" id="qvTitle">Item Title</h3>
                  <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="fs-4 font-serif fw-bold text-main" id="qvPrice">$0</span>
                    <span class="text-muted">|</span>
                    <small class="text-gold" id="qvCarat">Carats</small>
                  </div>
                  <p class="text-muted mb-4" id="qvDesc">Description...</p>
                  
                  <div class="mb-4">
                    <label class="form-label text-uppercase text-muted" style="font-size:0.75rem; letter-spacing:1px;">Metal & Atelier Finish</label>
                    <div class="d-flex gap-2" id="qvMetal">
                      <span class="badge bg-dark border border-warning text-gold px-3 py-2">18k Yellow Gold</span>
                      <span class="badge bg-dark border border-secondary text-muted px-3 py-2">Platinum 950</span>
                    </div>
                  </div>

                  <div class="d-flex gap-2">
                    <button class="btn btn-gold flex-grow-1" id="qvAddToCart">Add to Shopping Bag</button>
                    <button class="wishlist-btn position-relative" id="qvWishlist" style="top:0; right:0;">
                      <i class="bi bi-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modalEl = document.getElementById('quickViewModal');
  }

  document.getElementById('qvBadge').textContent = item.badge;
  document.getElementById('qvImage').src = item.image;
  document.getElementById('qvTitle').textContent = item.title;
  document.getElementById('qvPrice').textContent = `$${item.price.toLocaleString()}`;
  document.getElementById('qvCarat').textContent = `${item.carat} • ${item.metal}`;
  document.getElementById('qvDesc').textContent = item.desc;

  const addBtn = document.getElementById('qvAddToCart');
  addBtn.onclick = () => {
    addToCart(item.id);
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    bsModal?.hide();
  };

  const wishBtn = document.getElementById('qvWishlist');
  wishBtn.onclick = () => toggleWishlist(item.id, wishBtn);

  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
}

/* Stat Counter Animated Scroll Trigger */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target || '0');
        let current = 0;
        const step = Math.ceil(target / 40);

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = target + (counter.dataset.suffix || '');
            clearInterval(timer);
          } else {
            counter.textContent = current + (counter.dataset.suffix || '');
          }
        }, 30);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* Dynamic Character Reveal Splitter for Signature Masterpieces Title */
function initCharacterReveal() {
  const charHeadings = document.querySelectorAll('.reveal-char-title');
  charHeadings.forEach(heading => {
    if (heading.dataset.charProcessed) return;
    heading.dataset.charProcessed = 'true';

    const rawText = heading.textContent.trim();
    heading.setAttribute('aria-label', rawText);
    heading.innerHTML = '';

    const words = rawText.split(' ');
    let globalCharIndex = 0;

    words.forEach((word, wIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'char-word';

      for (let i = 0; i < word.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.style.setProperty('--char-index', globalCharIndex);
        charSpan.textContent = word[i];
        wordSpan.appendChild(charSpan);
        globalCharIndex++;
      }

      heading.appendChild(wordSpan);

      if (wIdx < words.length - 1) {
        const spaceSpan = document.createElement('span');
        spaceSpan.className = 'char-space';
        spaceSpan.innerHTML = '&nbsp;';
        heading.appendChild(spaceSpan);
      }
    });
  });
}

/* Unique Scroll Reveal Observer for Signature Section & Masterpieces */
function initScrollRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal-char-section, .reveal-char-title, .reveal-mask-title, .reveal-title-elegant, .reveal-title, .reveal-card-left, .reveal-card-center, .reveal-card-right, .reveal-card, .reveal-on-scroll');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '50px 0px 50px 0px'
  });

  revealElements.forEach(el => {
    observer.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-visible');
    }
  });
}

/* ==========================================================================
   AURA ATELIER AUTHENTICATION SYSTEM (LOGIN, SIGNUP, HEADER TAB TOGGLES)
   ========================================================================== */

function initAuthSystem() {
  initAuthModal();
  updateHeaderAuthState();
}

function initAuthModal() {
  if (document.getElementById('authModal')) return;

  const modalHtml = `
    <div class="modal fade" id="authModal" tabindex="-1" aria-hidden="true" style="z-index: 1080;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-emerald-dark border-gold text-main shadow-lg">
          <div class="modal-header border-bottom border-secondary border-opacity-25 py-3">
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-sm btn-gold active px-3 font-serif" id="authTabLoginBtn" onclick="switchAuthTab('login')">
                <i class="bi bi-box-arrow-in-right me-1"></i> Sign In
              </button>
              <button class="btn btn-sm btn-gold-outline px-3 font-serif" id="authTabSignupBtn" onclick="switchAuthTab('signup')">
                <i class="bi bi-person-plus me-1"></i> Sign Up
              </button>
            </div>
            <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          
          <div class="modal-body p-4">
            <!-- Notification Alert -->
            <div id="authAlert" class="alert alert-warning d-none py-2 px-3 small font-serif mb-3"></div>

            <!-- Login Form -->
            <form id="loginForm" onsubmit="handleLoginSubmit(event)">
              <div class="mb-3">
                <label class="form-label text-uppercase text-muted" style="font-size:0.72rem; letter-spacing: 0.5px;">Email Address *</label>
                <input type="email" id="loginEmail" class="form-control" required placeholder="vip@client.com">
              </div>
              <div class="mb-4">
                <label class="form-label text-uppercase text-muted" style="font-size:0.72rem; letter-spacing: 0.5px;">Password *</label>
                <input type="password" id="loginPassword" class="form-control" required placeholder="••••••••">
              </div>
              <button type="submit" class="btn btn-gold w-100 py-3 fw-semibold shadow-sm">
                Sign In to Private Account <i class="bi bi-arrow-right ms-1"></i>
              </button>
              <div class="text-center mt-3">
                <small class="text-muted">Don't have an account yet? <a href="#" onclick="switchAuthTab('signup'); return false;" class="text-gold fw-semibold">Sign Up first</a></small>
              </div>
            </form>

            <!-- Signup Form -->
            <form id="signupForm" class="d-none" onsubmit="handleSignupSubmit(event)">
              <div class="mb-3">
                <label class="form-label text-uppercase text-muted" style="font-size:0.72rem; letter-spacing: 0.5px;">Full Name *</label>
                <input type="text" id="signupName" class="form-control" required placeholder="Lord / Lady / Mr / Ms...">
              </div>
              <div class="mb-3">
                <label class="form-label text-uppercase text-muted" style="font-size:0.72rem; letter-spacing: 0.5px;">Email Address *</label>
                <input type="email" id="signupEmail" class="form-control" required placeholder="vip@client.com">
              </div>
              <div class="mb-4">
                <label class="form-label text-uppercase text-muted" style="font-size:0.72rem; letter-spacing: 0.5px;">Create Password *</label>
                <input type="password" id="signupPassword" class="form-control" required placeholder="At least 6 characters">
              </div>
              <button type="submit" class="btn btn-gold w-100 py-3 fw-semibold shadow-sm">
                Create VIP Account <i class="bi bi-shield-check ms-1"></i>
              </button>
              <div class="text-center mt-3">
                <small class="text-muted">Already registered? <a href="#" onclick="switchAuthTab('login'); return false;" class="text-gold fw-semibold">Sign In here</a></small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function updateHeaderAuthState() {
  const loggedInUser = JSON.parse(localStorage.getItem('aura_logged_in_user') || 'null');

  // Find header action buttons across pages
  const buttons = document.querySelectorAll('.tanishq-action-btn');

  buttons.forEach(btn => {
    const href = btn.getAttribute('href') || '';
    const text = btn.textContent.trim().toUpperCase();

    if (href.includes('wishlist.html') || href.includes('profile.html#saved') || text.includes('WISHLIST')) {
      btn.classList.add('header-tab-wishlist');
    } else if (href.includes('cart.html') || text.includes('CART')) {
      btn.classList.add('header-tab-cart');
    }
  });

  const actionWrappers = document.querySelectorAll('.col-8.col-md-3.col-lg-3 .d-inline-flex, header .d-inline-flex');
  actionWrappers.forEach(wrapper => {
    // Inject Login button if not existing
    if (!wrapper.querySelector('.header-tab-login')) {
      const loginBtn = document.createElement('a');
      loginBtn.href = '#';
      loginBtn.className = 'header-login-btn header-tab-login';
      loginBtn.title = 'Login / Register';
      loginBtn.onclick = function (e) { e.preventDefault(); openAuthModal('login'); };
      loginBtn.innerHTML = '<i class="bi bi-box-arrow-in-right me-1"></i><span>LOGIN</span>';
      wrapper.appendChild(loginBtn);
    }
  });

  const wishlistTabs = document.querySelectorAll('.header-tab-wishlist');
  const accountTabs = document.querySelectorAll('.header-tab-account');
  const cartTabs = document.querySelectorAll('.header-tab-cart');
  const loginTabs = document.querySelectorAll('.header-tab-login');
  const logoutTabs = document.querySelectorAll('.header-tab-logout');

  if (loggedInUser) {
    wishlistTabs.forEach(el => el.classList.remove('d-none'));
    accountTabs.forEach(el => el.classList.remove('d-none'));
    cartTabs.forEach(el => el.classList.remove('d-none'));
    loginTabs.forEach(el => el.classList.add('d-none'));
    logoutTabs.forEach(el => el.classList.add('d-none'));
  } else {
    wishlistTabs.forEach(el => el.classList.add('d-none'));
    accountTabs.forEach(el => el.classList.add('d-none'));
    cartTabs.forEach(el => el.classList.add('d-none'));
    loginTabs.forEach(el => el.classList.remove('d-none'));
    logoutTabs.forEach(el => el.classList.add('d-none'));
  }
}

function toggleAccountDropdown(e) {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  const dropdownContainer = document.querySelector('.header-tab-account:not(.d-none)') || document.querySelector('.header-tab-account');
  if (!dropdownContainer) return;

  const menu = dropdownContainer.querySelector('.dropdown-menu');
  const toggleBtn = dropdownContainer.querySelector('.dropdown-toggle');

  if (menu) {
    const isShowing = menu.classList.contains('show');
    if (isShowing) {
      menu.classList.remove('show');
      dropdownContainer.classList.remove('show');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      menu.classList.add('show');
      dropdownContainer.classList.add('show');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    }
  }
}

// Global click listener to toggle account dropdown and close when clicking outside
document.addEventListener('click', function (e) {
  const dropdownContainer = document.querySelector('.header-tab-account:not(.d-none)') || document.querySelector('.header-tab-account');
  if (!dropdownContainer) return;

  if (dropdownContainer.contains(e.target)) {
    const toggleBtn = e.target.closest('#accountDropdown, .dropdown-toggle');
    if (toggleBtn) {
      toggleAccountDropdown(e);
    }
  } else {
    // Clicked outside -> close dropdown
    const menu = dropdownContainer.querySelector('.dropdown-menu');
    const toggleBtn = dropdownContainer.querySelector('.dropdown-toggle');
    if (menu) menu.classList.remove('show');
    dropdownContainer.classList.remove('show');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
  }
});

function openAuthModal(tab = 'login', message = '') {
  initAuthModal();
  switchAuthTab(tab);

  const alertEl = document.getElementById('authAlert');
  if (alertEl) {
    if (message) {
      alertEl.textContent = message;
      alertEl.classList.remove('d-none');
    } else {
      alertEl.classList.add('d-none');
    }
  }

  const modalEl = document.getElementById('authModal');
  if (modalEl && typeof bootstrap !== 'undefined') {
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginBtn = document.getElementById('authTabLoginBtn');
  const signupBtn = document.getElementById('authTabSignupBtn');
  const alertEl = document.getElementById('authAlert');

  if (alertEl) alertEl.classList.add('d-none');

  if (tab === 'login') {
    loginForm?.classList.remove('d-none');
    signupForm?.classList.add('d-none');
    loginBtn?.classList.add('btn-gold', 'active');
    loginBtn?.classList.remove('btn-gold-outline');
    signupBtn?.classList.add('btn-gold-outline');
    signupBtn?.classList.remove('btn-gold', 'active');
  } else {
    signupForm?.classList.remove('d-none');
    loginForm?.classList.add('d-none');
    signupBtn?.classList.add('btn-gold', 'active');
    signupBtn?.classList.remove('btn-gold-outline');
    loginBtn?.classList.add('btn-gold-outline');
    loginBtn?.classList.remove('btn-gold', 'active');
  }
}

function handleSignupSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim().toLowerCase();
  const password = document.getElementById('signupPassword').value;

  if (!name || !email || !password) return;

  let users = JSON.parse(localStorage.getItem('aura_users') || '[]');
  const existingUser = users.find(u => u.email.toLowerCase() === email);

  if (existingUser) {
    const alertEl = document.getElementById('authAlert');
    if (alertEl) {
      alertEl.textContent = 'An account with this email already exists. Please Sign In.';
      alertEl.classList.remove('d-none');
    }
    showLuxuryToast('Account already exists! Please Sign In.', 'bi-exclamation-triangle');
    switchAuthTab('login');
    document.getElementById('loginEmail').value = email;
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('aura_users', JSON.stringify(users));

  // Automatically log in newly signed up user
  localStorage.setItem('aura_logged_in_user', JSON.stringify(newUser));

  const modalEl = document.getElementById('authModal');
  if (modalEl && typeof bootstrap !== 'undefined') {
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    bsModal?.hide();
  }

  showLuxuryToast(`Account created! Welcome, ${newUser.name}.`, 'bi-shield-check');
  updateHeaderAuthState();
  checkPendingActions();
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) return;

  let users = JSON.parse(localStorage.getItem('aura_users') || '[]');

  const user = users.find(u => u.email.toLowerCase() === email);

  if (!user) {
    // MUST SIGN UP FIRST! User not found -> alert and switch tab to Signup
    const alertEl = document.getElementById('authAlert');
    if (alertEl) {
      alertEl.textContent = 'No registered account found with this email. You must Sign Up first!';
      alertEl.classList.remove('d-none');
    }
    showLuxuryToast('No account found! Please Sign Up first.', 'bi-exclamation-triangle');
    switchAuthTab('signup');
    document.getElementById('signupEmail').value = email;
    return;
  }

  if (user.password !== password) {
    const alertEl = document.getElementById('authAlert');
    if (alertEl) {
      alertEl.textContent = 'Incorrect password. Please try again.';
      alertEl.classList.remove('d-none');
    }
    showLuxuryToast('Incorrect password. Try again.', 'bi-exclamation-circle');
    return;
  }

  // Login success!
  localStorage.setItem('aura_logged_in_user', JSON.stringify(user));

  const modalEl = document.getElementById('authModal');
  if (modalEl && typeof bootstrap !== 'undefined') {
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    bsModal?.hide();
  }

  showLuxuryToast(`Welcome back, ${user.name}!`, 'bi-person-check-fill');
  updateHeaderAuthState();
  checkPendingActions();
}

function checkPendingActions() {
  const pendingAddToCart = localStorage.getItem('aura_pending_add_to_cart');
  if (pendingAddToCart) {
    localStorage.removeItem('aura_pending_add_to_cart');
    try {
      const { productId, qty } = JSON.parse(pendingAddToCart);
      const product = AURA_CATALOG.find(p => p.id === productId);
      if (product) {
        const existingItem = auraCart.find(item => item.id === productId);
        if (existingItem) {
          existingItem.quantity += (qty || 1);
        } else {
          auraCart.push({ ...product, quantity: (qty || 1) });
        }
        localStorage.setItem('aura_cart', JSON.stringify(auraCart));
        updateCartBadgeCount();
        renderCartDrawerContent();
        if (typeof renderCartPage === 'function') {
          renderCartPage();
        }
        setTimeout(() => {
          openCartDrawer();
          showLuxuryToast(`Added "${product.title}" to your Shopping Bag!`, 'bi-bag-check-fill');
        }, 400);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (localStorage.getItem('aura_pending_checkout') === 'true') {
    localStorage.removeItem('aura_pending_checkout');
    setTimeout(() => {
      const checkoutModalEl = document.getElementById('checkoutModal');
      if (checkoutModalEl && typeof bootstrap !== 'undefined') {
        const checkoutModal = bootstrap.Modal.getOrCreateInstance(checkoutModalEl);
        checkoutModal.show();
        showLuxuryToast('Logged in! Returning to checkout to complete your order.', 'bi-lock-fill');
      }
    }, 400);
  }
}

function logoutUser() {
  localStorage.removeItem('aura_logged_in_user');
  showLuxuryToast('You have logged out.', 'bi-box-arrow-right');
  updateHeaderAuthState();

  if (window.location.pathname.includes('profile.html')) {
    window.location.href = 'index.html';
  }
}

/* ==========================================================================
   GLOBAL SEARCH ENGINE & VISUAL IMAGE SEARCH SYSTEM
   ========================================================================== */

function initGlobalSearch() {
  const searchContainers = document.querySelectorAll('.tanishq-search-container');
  if (!searchContainers || searchContainers.length === 0) return;

  searchContainers.forEach(container => {
    const input = container.querySelector('.tanishq-search-input');
    const actions = container.querySelector('.tanishq-search-actions');
    if (!input) return;

    // Create dropdown container if not present
    let dropdown = container.querySelector('.tanishq-search-results-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'tanishq-search-results-dropdown shadow-lg d-none';
      container.appendChild(dropdown);
    }

    const renderTrendingSearches = () => {
      dropdown.innerHTML = `
        <div class="search-dropdown-header d-flex align-items-center justify-content-between">
          <span><i class="bi bi-fire text-gold me-1"></i> Trending Luxury Searches</span>
        </div>
        <div class="trending-chips-wrapper">
          <span class="trending-chip" data-query="Solitaire Ring"><i class="bi bi-gem text-gold"></i> Solitaire Ring</span>
          <span class="trending-chip" data-query="Gold Jhumka"><i class="bi bi-stars text-gold"></i> 22KT Gold Jhumka</span>
          <span class="trending-chip" data-query="Emerald Necklace"><i class="bi bi-circle-fill text-success" style="font-size:0.5rem"></i> Emerald Necklace</span>
          <span class="trending-chip" data-query="Ruby"><i class="bi bi-suit-heart-fill text-danger"></i> Royal Ruby</span>
          <span class="trending-chip" data-query="Tennis Bracelet"><i class="bi bi-app-indicator text-gold"></i> Tennis Bracelet</span>
          <span class="trending-chip" data-query="Diamond Studs"><i class="bi bi-brightness-high text-gold"></i> Diamond Studs</span>
        </div>
      `;
      dropdown.classList.remove('d-none');

      // Wire chips click
      dropdown.querySelectorAll('.trending-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          const q = chip.getAttribute('data-query');
          input.value = q;
          executeSearchQuery(q);
        });
      });
    };

    const renderLiveResults = (query) => {
      const qLower = query.toLowerCase();
      const matches = AURA_CATALOG.filter(item => {
        const title = item.title ? item.title.toLowerCase() : '';
        const desc = item.desc ? item.desc.toLowerCase() : '';
        const metal = item.metal ? item.metal.toLowerCase() : '';
        const gemstone = item.gemstone ? item.gemstone.toLowerCase() : '';
        const category = item.category ? item.category.toLowerCase() : '';
        const badge = item.badge ? item.badge.toLowerCase() : '';
        return title.includes(qLower) || desc.includes(qLower) || metal.includes(qLower) || gemstone.includes(qLower) || category.includes(qLower) || badge.includes(qLower);
      });

      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div class="search-dropdown-header">No Direct Matches</div>
          <div class="p-3 text-center text-muted small">
            <i class="bi bi-search fs-4 text-gold opacity-50 d-block mb-1"></i>
            No exact pieces found for "<strong>${escapeHtml(query)}</strong>".
            <div class="mt-2">
              <a href="collections.html" class="btn btn-sm btn-outline-dark rounded-pill px-3">Browse Full Catalog</a>
            </div>
          </div>
        `;
        dropdown.classList.remove('d-none');
        return;
      }

      const topMatches = matches.slice(0, 6);
      let itemsHtml = topMatches.map(item => `
        <div class="search-result-item" data-id="${item.id}">
          <img src="${item.image}" alt="${escapeHtml(item.title)}" class="search-result-thumb" onerror="this.src='images/luxeora_hero_rings.jpg'">
          <div class="search-result-info">
            <div class="search-result-title">${escapeHtml(item.title)}</div>
            <div class="search-result-meta">
              <span>${escapeHtml(item.metal)}</span>
              <span class="badge bg-light text-dark border ms-1" style="font-size:0.65rem;">${escapeHtml(item.badge || item.gemstone)}</span>
            </div>
          </div>
          <div class="search-result-price">$${item.price.toLocaleString()}</div>
        </div>
      `).join('');

      dropdown.innerHTML = `
        <div class="search-dropdown-header d-flex align-items-center justify-content-between">
          <span>Catalog Results (${matches.length})</span>
          <span class="text-muted" style="font-weight:normal; font-size:0.7rem;">Press Enter for full page</span>
        </div>
        <div class="search-dropdown-body">
          ${itemsHtml}
        </div>
        <div class="search-dropdown-footer">
          <a href="collections.html?search=${encodeURIComponent(query)}" class="search-view-all-link">
            View all ${matches.length} matching jewelry designs &rarr;
          </a>
        </div>
      `;
      dropdown.classList.remove('d-none');

      // Result click listener
      dropdown.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const pId = parseInt(el.getAttribute('data-id'), 10);
          dropdown.classList.add('d-none');
          if (typeof openQuickView === 'function') {
            openQuickView(pId);
          } else {
            window.location.href = `collections.html?search=${encodeURIComponent(query)}`;
          }
        });
      });

      dropdown.querySelector('.search-view-all-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.add('d-none');
        executeSearchQuery(query);
      });
    };

    const executeSearchQuery = (q) => {
      const trimmed = q.trim();
      if (!trimmed) return;
      dropdown.classList.add('d-none');

      // Check if current page is collections.html
      const currentPath = window.location.pathname.toLowerCase();
      if (currentPath.includes('collections.html')) {
        const pageSearchInput = document.getElementById('searchInput');
        if (pageSearchInput) {
          pageSearchInput.value = trimmed;
        }
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + encodeURIComponent(trimmed);
        window.history.pushState({ path: newUrl }, '', newUrl);

        if (typeof filterCatalog === 'function') {
          filterCatalog();
        }
        // Scroll to catalog grid if needed
        const gridEl = document.getElementById('catalogGrid');
        if (gridEl) {
          gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.location.href = `collections.html?search=${encodeURIComponent(trimmed)}`;
      }
    };

    // Event Listeners on Input
    input.addEventListener('focus', () => {
      const q = input.value.trim();
      if (!q) {
        renderTrendingSearches();
      } else {
        renderLiveResults(q);
      }
    });

    input.addEventListener('input', () => {
      const q = input.value.trim();
      if (!q) {
        renderTrendingSearches();
      } else {
        renderLiveResults(q);
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeSearchQuery(input.value);
      } else if (e.key === 'Escape') {
        dropdown.classList.add('d-none');
      }
    });

    // Wire Search Icon Button
    if (actions) {
      const searchBtn = actions.querySelector('button[title="Search"]') || actions.querySelector('.bi-search')?.closest('button');
      if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
          e.preventDefault();
          executeSearchQuery(input.value);
        });
      }

      // Wire Visual Search Camera Button
      const cameraBtn = actions.querySelector('button[title="Visual Search"]') || actions.querySelector('.bi-camera')?.closest('button');
      if (cameraBtn) {
        cameraBtn.addEventListener('click', (e) => {
          e.preventDefault();
          dropdown.classList.add('d-none');
          openVisualSearchModal();
        });
      }
    }
  });

  // Global click outside to hide dropdown
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.tanishq-search-container')) {
      document.querySelectorAll('.tanishq-search-results-dropdown').forEach(d => d.classList.add('d-none'));
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* Visual Camera Search Modal System */
function initVisualSearchModal() {
  if (document.getElementById('visualSearchModal')) return;

  const modalMarkup = `
    <div class="modal fade" id="visualSearchModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-gold rounded-4" style="background:#FFFDF9;">
          <div class="modal-header border-bottom-0 pb-0">
            <h5 class="modal-title font-serif text-gold d-flex align-items-center gap-2">
              <i class="bi bi-camera fs-4 text-gold"></i>
              <span>Luxeora AI Visual Search</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4 text-center">
            <p class="text-muted small mb-4">Upload or select a photo of any ring, necklace, or gemstone to instantly match design signatures across our Haute Joaillerie catalog.</p>
            
            <div class="visual-search-dropzone mb-4" id="visualDropzone">
              <i class="bi bi-cloud-arrow-up display-5 text-gold mb-2 d-block"></i>
              <div class="fw-semibold text-dark">Drag & Drop Image Here or <span class="text-gold text-decoration-underline">Browse Local File</span></div>
              <div class="text-muted small mt-1">Supports JPG, PNG, WEBP</div>
              <input type="file" id="visualFileInput" accept="image/*" class="d-none">
            </div>

            <div class="text-uppercase text-muted mb-2 fw-semibold" style="font-size:0.72rem; letter-spacing:1px;">Or Sample Visual Preset Searches</div>
            <div class="d-flex justify-content-center gap-2 flex-wrap mb-4" id="visualSampleChips">
              <button class="btn btn-sm btn-outline-dark rounded-pill px-3 sample-img-btn" data-search="solitaire" data-img="images/luxeora_hero_rings.jpg">💎 Solitaire Oval Ring</button>
              <button class="btn btn-sm btn-outline-dark rounded-pill px-3 sample-img-btn" data-search="emerald" data-img="images/luxeora_hero_emerald.jpg">🌿 Emerald Drop</button>
              <button class="btn btn-sm btn-outline-dark rounded-pill px-3 sample-img-btn" data-search="gold" data-img="images/cat_earrings.jpg">✨ 22KT Gold Jhumka</button>
              <button class="btn btn-sm btn-outline-dark rounded-pill px-3 sample-img-btn" data-search="ruby" data-img="images/ruby_pendant.jpg">👑 Royal Ruby Pendant</button>
            </div>

            <div id="visualScanContainer" class="d-none mb-4">
              <div class="visual-scanner-container mb-3">
                <img id="visualPreviewImg" src="" class="img-fluid rounded-3" alt="Analysis Preview">
                <div class="visual-scanner-line"></div>
              </div>
              <div class="text-gold fw-semibold small" id="visualScanStatus">
                <span class="spinner-border spinner-border-sm me-2" role="status"></span>Analyzing gemstone cut, carat proportions & metal alloy...
              </div>
            </div>

            <div id="visualResultsContainer" class="d-none text-start">
              <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
                <h6 class="text-uppercase text-gold font-serif mb-0">Top Visual Matches Found</h6>
                <span class="badge bg-success bg-opacity-10 text-success border border-success rounded-pill px-3">Visual Match Active</span>
              </div>
              <div class="row g-3" id="visualResultsGrid"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalMarkup);
}

function openVisualSearchModal() {
  initVisualSearchModal();
  const modalEl = document.getElementById('visualSearchModal');
  if (!modalEl || typeof bootstrap === 'undefined') return;

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();

  const dropzone = document.getElementById('visualDropzone');
  const fileInput = document.getElementById('visualFileInput');
  const scanContainer = document.getElementById('visualScanContainer');
  const previewImg = document.getElementById('visualPreviewImg');
  const scanStatus = document.getElementById('visualScanStatus');
  const resultsContainer = document.getElementById('visualResultsContainer');
  const resultsGrid = document.getElementById('visualResultsGrid');

  // Reset modal state
  scanContainer.classList.add('d-none');
  resultsContainer.classList.add('d-none');
  resultsGrid.innerHTML = '';

  if (dropzone && fileInput) {
    dropzone.onclick = () => fileInput.click();

    fileInput.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
          runVisualScan(evt.target.result, 'diamond ring');
        };
        reader.readAsDataURL(file);
      }
    };
  }

  // Sample buttons
  document.querySelectorAll('.sample-img-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const imgSrc = btn.getAttribute('data-img');
      const queryKey = btn.getAttribute('data-search');
      runVisualScan(imgSrc, queryKey);
    };
  });

  function runVisualScan(imgSrc, queryKey) {
    scanContainer.classList.remove('d-none');
    resultsContainer.classList.add('d-none');
    previewImg.src = imgSrc;
    scanStatus.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span>Analyzing gemstone cut, metal alloy & micro-pave signatures...`;

    setTimeout(() => {
      scanStatus.innerHTML = `<i class="bi bi-check-circle-fill text-success me-2"></i>Analysis Complete! 98.4% Match Found.`;

      const matches = AURA_CATALOG.filter(item => {
        const t = (item.title + ' ' + item.desc + ' ' + item.metal + ' ' + item.gemstone + ' ' + item.category).toLowerCase();
        return t.includes(queryKey.toLowerCase());
      }).slice(0, 3);

      const itemsToDisplay = matches.length > 0 ? matches : AURA_CATALOG.slice(0, 3);

      resultsGrid.innerHTML = itemsToDisplay.map((item, idx) => `
        <div class="col-md-4">
          <div class="card h-100 border-gold rounded-3 shadow-sm text-center p-2">
            <span class="badge bg-gold text-white position-absolute top-0 end-0 m-2" style="font-size:0.65rem;">${99 - idx * 2}% Match</span>
            <img src="${item.image}" class="card-img-top rounded-2 mb-2" style="height:140px; object-fit:cover;" alt="${escapeHtml(item.title)}">
            <div class="card-body p-2 d-flex flex-column justify-content-between">
              <div>
                <h6 class="card-title font-serif small mb-1" style="line-height:1.2;">${escapeHtml(item.title)}</h6>
                <div class="text-muted" style="font-size:0.7rem;">${escapeHtml(item.metal)}</div>
              </div>
              <div class="mt-2">
                <div class="fw-bold text-gold small mb-2">$${item.price.toLocaleString()}</div>
                <button class="btn btn-sm btn-gold w-100 rounded-pill py-1 text-uppercase" style="font-size:0.7rem;" onclick="viewVisualMatch(${item.id})">View Piece</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');

      resultsContainer.classList.remove('d-none');
    }, 1200);
  }
}

function viewVisualMatch(id) {
  const modalEl = document.getElementById('visualSearchModal');
  if (modalEl && typeof bootstrap !== 'undefined') {
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
  }
  if (typeof openQuickView === 'function') {
    openQuickView(id);
  } else {
    window.location.href = `collections.html?search=item_${id}`;
  }
}

/* ==========================================================================
   LUXEORA ROYAL DIAMOND ANIMATED PRELOADER CONTROLLER
   Ensures instantaneous first-paint feedback, realistic progress progression,
   graceful exit, and smooth transitions across all pages.
   ========================================================================== */
(function initLuxeoraPreloaderController() {
  let isDismissed = false;
  let progressInterval = null;
  let currentProgress = 15;

  function getPreloader() {
    return document.getElementById('luxeoraPreloader');
  }

  function advanceProgress(percent) {
    const preloader = getPreloader();
    if (!preloader) return;
    const clamped = Math.min(100, Math.max(0, percent));
    const fill = preloader.querySelector('.luxeora-progress-fill');
    if (fill) {
      fill.style.width = clamped + '%';
    }
    const percentEl = preloader.querySelector('#luxeoraLoaderPercent');
    if (percentEl) {
      percentEl.textContent = Math.round(clamped) + '%';
    }
  }

  function dismissPreloader() {
    if (isDismissed) return;
    isDismissed = true;

    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }

    const preloader = getPreloader();
    if (!preloader) return;

    advanceProgress(100);

    // Aesthetic 200ms pause to show completed 100% diamond bar before dissolution
    setTimeout(() => {
      preloader.classList.add('loaded');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 750);
    }, 200);
  }

  // Realistic progress simulation while assets and fonts stream in
  progressInterval = setInterval(() => {
    if (isDismissed) {
      clearInterval(progressInterval);
      return;
    }
    if (currentProgress < 68) {
      currentProgress += Math.floor(Math.random() * 12) + 8;
      advanceProgress(currentProgress);
    } else if (currentProgress < 94) {
      currentProgress += Math.floor(Math.random() * 5) + 2;
      advanceProgress(currentProgress);
    }
  }, 110);

  // Dismiss immediately when full window assets (images, stylesheets) are loaded
  if (document.readyState === 'complete') {
    setTimeout(dismissPreloader, 150);
  } else {
    window.addEventListener('load', () => {
      setTimeout(dismissPreloader, 180);
    });
  }

  // Safety Fallback: Under any slow connection or asset delay, never block longer than 1350ms
  setTimeout(() => {
    dismissPreloader();
  }, 1350);

  // Handle browser back/forward cache (bfcache) restore
  window.addEventListener('pageshow', (event) => {
    const preloader = getPreloader();
    if (event.persisted && preloader) {
      preloader.classList.add('loaded');
      preloader.style.display = 'none';
      isDismissed = true;
    }
  });

  // Seamless Page Transition on internal navigation links
  document.addEventListener('DOMContentLoaded', () => {
    // If preloader was not in static HTML, inject dynamically
    if (!getPreloader() && document.body) {
      const wrapper = document.createElement('div');
      wrapper.id = 'luxeoraPreloader';
      wrapper.className = 'luxeora-preloader';
      wrapper.setAttribute('aria-hidden', 'true');
      wrapper.innerHTML = `
        <div class="luxeora-loader-backdrop">
          <div class="luxeora-loader-glow"></div>
          <div class="luxeora-loader-guilloche"></div>
          <div class="luxeora-loader-rosette"></div>
          <div class="neon-sparkle-field">
            <span class="neon-sparkle spark-1"></span>
            <span class="neon-sparkle spark-2"></span>
            <span class="neon-sparkle spark-3"></span>
            <span class="neon-sparkle spark-4"></span>
            <span class="neon-sparkle spark-5"></span>
            <span class="neon-sparkle spark-6"></span>
            <span class="neon-sparkle spark-7"></span>
            <span class="neon-sparkle spark-8"></span>
          </div>
        </div>
        <div class="luxeora-butterflies-stage" aria-hidden="true">
          <div class="neon-butterfly-flight path-cyan">
            <div class="neon-butterfly butterfly-cyan">
              <div class="butterfly-wing wing-left">
                <svg viewBox="0 0 36 44" class="wing-svg">
                  <path d="M34,22 C32,11 25,2 13,1 C3,0 0,8 1,16 C2,22 10,26 34,22 Z" class="wing-upper" />
                  <path d="M34,22 C27,24 16,28 10,34 C4,40 10,44 18,43 C26,42 32,32 34,22 Z" class="wing-lower" />
                  <path d="M33,21 C22,14 12,10 6,6" class="wing-vein" />
                  <path d="M33,21 C24,18 16,18 8,14" class="wing-vein" />
                  <path d="M33,22 C24,26 18,32 14,38" class="wing-vein" />
                  <circle cx="8" cy="8" r="1.5" class="wing-jewel" />
                  <circle cx="16" cy="4" r="1.2" class="wing-jewel" />
                  <circle cx="13" cy="38" r="1.2" class="wing-jewel" />
                </svg>
              </div>
              <div class="butterfly-body-core">
                <div class="butterfly-torso"></div>
                <div class="butterfly-antenna ant-left"></div>
                <div class="butterfly-antenna ant-right"></div>
              </div>
              <div class="butterfly-wing wing-right">
                <svg viewBox="0 0 36 44" class="wing-svg">
                  <path d="M2,22 C4,11 11,2 23,1 C33,0 36,8 35,16 C34,22 26,26 2,22 Z" class="wing-upper" />
                  <path d="M2,22 C9,24 20,28 26,34 C32,40 26,44 18,43 C10,42 4,32 2,22 Z" class="wing-lower" />
                  <path d="M3,21 C14,14 24,10 30,6" class="wing-vein" />
                  <path d="M3,21 C12,18 20,18 28,14" class="wing-vein" />
                  <path d="M3,22 C12,26 18,32 22,38" class="wing-vein" />
                  <circle cx="28" cy="8" r="1.5" class="wing-jewel" />
                  <circle cx="20" cy="4" r="1.2" class="wing-jewel" />
                  <circle cx="23" cy="38" r="1.2" class="wing-jewel" />
                </svg>
              </div>
            </div>
          </div>
          <div class="neon-butterfly-flight path-magenta">
            <div class="neon-butterfly butterfly-magenta">
              <div class="butterfly-wing wing-left">
                <svg viewBox="0 0 36 44" class="wing-svg">
                  <path d="M34,22 C32,11 25,2 13,1 C3,0 0,8 1,16 C2,22 10,26 34,22 Z" class="wing-upper" />
                  <path d="M34,22 C27,24 16,28 10,34 C4,40 10,44 18,43 C26,42 32,32 34,22 Z" class="wing-lower" />
                  <path d="M33,21 C22,14 12,10 6,6" class="wing-vein" />
                  <path d="M33,21 C24,18 16,18 8,14" class="wing-vein" />
                  <path d="M33,22 C24,26 18,32 14,38" class="wing-vein" />
                  <circle cx="8" cy="8" r="1.5" class="wing-jewel" />
                  <circle cx="16" cy="4" r="1.2" class="wing-jewel" />
                  <circle cx="13" cy="38" r="1.2" class="wing-jewel" />
                </svg>
              </div>
              <div class="butterfly-body-core">
                <div class="butterfly-torso"></div>
                <div class="butterfly-antenna ant-left"></div>
                <div class="butterfly-antenna ant-right"></div>
              </div>
              <div class="butterfly-wing wing-right">
                <svg viewBox="0 0 36 44" class="wing-svg">
                  <path d="M2,22 C4,11 11,2 23,1 C33,0 36,8 35,16 C34,22 26,26 2,22 Z" class="wing-upper" />
                  <path d="M2,22 C9,24 20,28 26,34 C32,40 26,44 18,43 C10,42 4,32 2,22 Z" class="wing-lower" />
                  <path d="M3,21 C14,14 24,10 30,6" class="wing-vein" />
                  <path d="M3,21 C12,18 20,18 28,14" class="wing-vein" />
                  <path d="M3,22 C12,26 18,32 22,38" class="wing-vein" />
                  <circle cx="28" cy="8" r="1.5" class="wing-jewel" />
                  <circle cx="20" cy="4" r="1.2" class="wing-jewel" />
                  <circle cx="23" cy="38" r="1.2" class="wing-jewel" />
                </svg>
              </div>
            </div>
          </div>
          <div class="neon-butterfly-flight path-emerald">
            <div class="neon-butterfly butterfly-emerald">
              <div class="butterfly-wing wing-left">
                <svg viewBox="0 0 36 44" class="wing-svg">
                  <path d="M34,22 C32,11 25,2 13,1 C3,0 0,8 1,16 C2,22 10,26 34,22 Z" class="wing-upper" />
                  <path d="M34,22 C27,24 16,28 10,34 C4,40 10,44 18,43 C26,42 32,32 34,22 Z" class="wing-lower" />
                  <path d="M33,21 C22,14 12,10 6,6" class="wing-vein" />
                  <path d="M33,21 C24,18 16,18 8,14" class="wing-vein" />
                  <path d="M33,22 C24,26 18,32 14,38" class="wing-vein" />
                  <circle cx="8" cy="8" r="1.5" class="wing-jewel" />
                  <circle cx="16" cy="4" r="1.2" class="wing-jewel" />
                  <circle cx="13" cy="38" r="1.2" class="wing-jewel" />
                </svg>
              </div>
              <div class="butterfly-body-core">
                <div class="butterfly-torso"></div>
                <div class="butterfly-antenna ant-left"></div>
                <div class="butterfly-antenna ant-right"></div>
              </div>
              <div class="butterfly-wing wing-right">
                <svg viewBox="0 0 36 44" class="wing-svg">
                  <path d="M2,22 C4,11 11,2 23,1 C33,0 36,8 35,16 C34,22 26,26 2,22 Z" class="wing-upper" />
                  <path d="M2,22 C9,24 20,28 26,34 C32,40 26,44 18,43 C10,42 4,32 2,22 Z" class="wing-lower" />
                  <path d="M3,21 C14,14 24,10 30,6" class="wing-vein" />
                  <path d="M3,21 C12,18 20,18 28,14" class="wing-vein" />
                  <path d="M3,22 C12,26 18,32 22,38" class="wing-vein" />
                  <circle cx="28" cy="8" r="1.5" class="wing-jewel" />
                  <circle cx="20" cy="4" r="1.2" class="wing-jewel" />
                  <circle cx="23" cy="38" r="1.2" class="wing-jewel" />
                </svg>
              </div>
            </div>
          </div>
          <div class="neon-butterfly-flight path-violet">
            <div class="neon-butterfly butterfly-violet">
              <div class="butterfly-wing wing-left">
                <svg viewBox="0 0 36 44" class="wing-svg">
                  <path d="M34,22 C32,11 25,2 13,1 C3,0 0,8 1,16 C2,22 10,26 34,22 Z" class="wing-upper" />
                  <path d="M34,22 C27,24 16,28 10,34 C4,40 10,44 18,43 C26,42 32,32 34,22 Z" class="wing-lower" />
                  <path d="M33,21 C22,14 12,10 6,6" class="wing-vein" />
                  <path d="M33,22 C24,26 18,32 14,38" class="wing-vein" />
                  <circle cx="8" cy="8" r="1.5" class="wing-jewel" />
                </svg>
              </div>
              <div class="butterfly-body-core">
                <div class="butterfly-torso"></div>
                <div class="butterfly-antenna ant-left"></div>
                <div class="butterfly-antenna ant-right"></div>
              </div>
              <div class="butterfly-wing wing-right">
                <svg viewBox="0 0 36 44" class="wing-svg">
                  <path d="M2,22 C4,11 11,2 23,1 C33,0 36,8 35,16 C34,22 26,26 2,22 Z" class="wing-upper" />
                  <path d="M2,22 C9,24 20,28 26,34 C32,40 26,44 18,43 C10,42 4,32 2,22 Z" class="wing-lower" />
                  <path d="M3,21 C14,14 24,10 30,6" class="wing-vein" />
                  <path d="M3,22 C12,26 18,32 22,38" class="wing-vein" />
                  <circle cx="28" cy="8" r="1.5" class="wing-jewel" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="luxeora-loader-content">
          <div class="luxeora-emblem-wrapper">
            <div class="luxeora-astrolabe-ring"></div>
            <div class="luxeora-orbital-ring outer-ring"></div>
            <div class="luxeora-orbital-ring inner-ring">
              <div class="orbital-sparkle-dot"></div>
            </div>
            <div class="luxeora-center-diamond">
              <svg viewBox="0 0 100 100" class="diamond-svg">
                <defs>
                  <linearGradient id="loaderGoldGlint" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFFFFF" />
                    <stop offset="25%" stop-color="#FFEAA7" />
                    <stop offset="65%" stop-color="#D4AF37" />
                    <stop offset="100%" stop-color="#8F692E" />
                  </linearGradient>
                  <linearGradient id="loaderDiamondSpark" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="rgba(255, 255, 255, 0.95)" />
                    <stop offset="50%" stop-color="rgba(255, 248, 225, 0.75)" />
                    <stop offset="100%" stop-color="rgba(212, 175, 55, 0.35)" />
                  </linearGradient>
                  <filter id="loaderGoldGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <polygon points="50,14 82,34 82,66 50,86 18,66 18,34" fill="rgba(255, 255, 255, 0.72)" stroke="url(#loaderGoldGlint)" stroke-width="1.8" filter="url(#loaderGoldGlow)" />
                <polygon points="50,22 75,38 75,62 50,78 25,62 25,38" fill="rgba(212, 175, 55, 0.14)" stroke="url(#loaderGoldGlint)" stroke-width="1.2" />
                <line x1="50" y1="14" x2="50" y2="86" stroke="url(#loaderGoldGlint)" stroke-width="1" opacity="0.8" />
                <line x1="18" y1="50" x2="82" y2="50" stroke="url(#loaderGoldGlint)" stroke-width="1" opacity="0.8" />
                <line x1="25" y1="38" x2="75" y2="62" stroke="url(#loaderGoldGlint)" stroke-width="0.8" opacity="0.55" />
                <line x1="25" y1="62" x2="75" y2="38" stroke="url(#loaderGoldGlint)" stroke-width="0.8" opacity="0.55" />
                <polygon points="50,32 63,41 63,59 50,68 37,59 37,41" fill="url(#loaderDiamondSpark)" stroke="#FFEAA7" stroke-width="1.4" />
                <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />
              </svg>
              <div class="diamond-flare-star"></div>
            </div>
          </div>
          <div class="luxeora-brand-container">
            <h2 class="luxeora-loader-title">LUXEORA</h2>
            <div class="luxeora-loader-subtitle"><span>❖</span> HAUTE JOAILLERIE &bull; GENEVA &bull; EST. 1928 <span>❖</span></div>
          </div>
          <div class="luxeora-loader-status">
            <span class="loader-status-dot"></span>
            <span class="loader-status-text">CRAFTING HEIRLOOM BRILLIANCE</span>
            <span class="loader-percent" id="luxeoraLoaderPercent">15%</span>
          </div>
          <div class="luxeora-progress-track">
            <div class="progress-ticks">
              <span class="tick t-25"></span>
              <span class="tick t-50"></span>
              <span class="tick t-75"></span>
            </div>
            <div class="luxeora-progress-fill">
              <div class="progress-diamond-head"></div>
            </div>
          </div>
        </div>
      `;
      document.body.prepend(wrapper);
    }

    const preloader = getPreloader();
    if (!preloader) return;

    // Intercept internal page links for smooth animated transition between pages
    const internalLinks = document.querySelectorAll(
      'a[href]:not([target="_blank"]):not([href^="#"]):not([href^="javascript:"]):not([href^="mailto:"]):not([href^="tel:"])'
    );

    internalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#' || href.startsWith('#') || href.startsWith('javascript:')) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;

        try {
          const targetUrl = new URL(this.href, window.location.href);
          // Only trigger if staying on same origin and actually navigating to different file
          if (targetUrl.origin === window.location.origin && targetUrl.pathname !== window.location.pathname) {
            preloader.style.display = 'flex';
            preloader.classList.remove('loaded');
            advanceProgress(18);
            setTimeout(() => {
              advanceProgress(65);
            }, 60);
          }
        } catch (err) {
          // Allow default link navigation
        }
      });
    });
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  initAuthSystem();
  initGlobalSearch();
  initVisualSearchModal();
});



