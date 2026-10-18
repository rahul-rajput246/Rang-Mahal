const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} HTML files to inspect and polish.`);

// Replacements for index.html specific sections
function polishIndexHtml(content) {
  // Hero slider
  content = content.replace(
    /<span class="hero-sub">Medium 3-topping\* Pizza<\/span>\s*<h1 class="hero-title tz-split-1 hero_title">\s*Yummy Food And <span>Pizza<\/span>\s*<\/h1>\s*<p>HAM, GREEN PEPPERS, PINEAPPLE, SMOKED BACON <\/p>/g,
    '<span class="hero-sub">Royal Awadhi Feast</span>\n                                                        <h1 class="hero-title tz-split-1 hero_title">\n                                                            Grand Palace <span>Cuisine</span>\n                                                        </h1>\n                                                        <p>SLOW-COOKED DUM BIRYANI, CHARCOAL KEBABS & ROYAL TANDOOR </p>'
  );

  content = content.replace(
    /<span class="hero-sub">Medium 3-topping\* Pizza<\/span>\s*<h1 class="hero-title tz-split-1 hero_title">\s*Tasty Food & <span>Pizza<\/span>\s*<\/h1>\s*<p>HAM, GREEN PEPPERS, PINEAPPLE, SMOKED BACON <\/p>/g,
    '<span class="hero-sub">Charcoal Clay Tandoor</span>\n                                                        <h1 class="hero-title tz-split-1 hero_title">\n                                                           Mughlai & <span>Tandoori</span>\n                                                        </h1>\n                                                        <p>HAND-CRAFTED KEBABS, SAFFRON MARINADE & FRESH ROOMALI </p>'
  );

  content = content.replace(
    /<span class="hero-sub">Medium 3-topping\* Pizza<\/span>\s*<h1 class="hero-title tz-split-1 hero_title">\s*Hot Food & <span>Pizza<\/span>\s*<\/h1>\s*<p>HAM, GREEN PEPPERS, PINEAPPLE, SMOKED BACON <\/p>/g,
    '<span class="hero-sub">Signature Royal Thali</span>\n                                                        <h1 class="hero-title tz-split-1 hero_title">\n                                                           Timeless <span>Delicacies</span>\n                                                        </h1>\n                                                        <p>RICH SHAHI GRAVIES, AWADHI SPICES & FRAGRANT BASMATI </p>'
  );

  // Shop banner cards
  content = content.replace(
    /<h2 class="title">\s*Beef <br>\s*Burger\s*<\/h2>\s*<p class="text">\s*PHENOMENON BURGER TASTE\s*<\/p>\s*<h3 class="price">₹19-₹39<\/h3>/g,
    '<h2 class="title">\n                                            Royal Dum <br> Biryani\n                                        </h2>\n                                        <p class="text">\n                                            AWADHI DUM PUKHT PERFECTION\n                                        </p>\n                                        <h3 class="price">₹450 - ₹750</h3>'
  );
  content = content.replace(/<h2 class="food-title">Burger<\/h2>/g, '<h2 class="food-title">Biryani</h2>');

  content = content.replace(
    /<h2 class="title">\s*QUESADILLA\s*<\/h2>\s*<p class="text">\s*s\.Wheat tortilla with spicy chicken bite\s*<\/p>\s*<div class="price-item">\s*<h3 class="price">₹19-₹39<\/h3>/g,
    '<h2 class="title">\n                                            GALOUTI KEBAB\n                                        </h2>\n                                        <p class="text">\n                                           Lucknowi melt-in-mouth kebabs with royal spices\n                                        </p>\n                                        <div class="price-item">\n                                            <h3 class="price">₹495 - ₹650</h3>'
  );

  content = content.replace(
    /<h2 class="title">\s*Italian <br>\s*food\s*<\/h2>\s*<p class="text">\s*PHENOMENON BURGER TASTE\s*<\/p>\s*<h3 class="price">₹19-₹39<\/h3>/g,
    '<h2 class="title">\n                                            Tandoori <br> Jheenga\n                                        </h2>\n                                        <p class="text">\n                                            CHARCOAL CLAY OVEN JUMBO PRAWNS\n                                        </p>\n                                        <h3 class="price">₹695 - ₹950</h3>'
  );
  content = content.replace(/<h2 class="food-title text-center">Italian<\/h2>/g, '<h2 class="food-title text-center">Tandoor</h2>');

  // Categories in index.html
  content = content.replace(/Our\s*Delicious\s*Fast\s*Foods/g, 'Our Imperial Palace Menu');
  content = content.replace(/Get your orders delivered quickly with reliable shipping partners and real-time <br> order tracking\. Easy and transparent returns with clear policies\./g, 'Experience heritage recipes perfected over three decades across royal darbars and celebrated regional kitchens.');
  content = content.replace(/Double Cheese Pizza/g, 'Shahi Dum Biryani');
  content = content.replace(/Crispy Chicken Burger/g, 'Murgh Malai Tikka');
  content = content.replace(/Pepperoni Burger/g, 'Kashmiri Rogan Josh');
  content = content.replace(/Classic Beef Pizza/g, 'Dal Makhani Bukhara');
  content = content.replace(/BBQ Chicken Wings/g, 'Tandoori Jheenga Khas');
  content = content.replace(/Crispy Classic Onion/g, 'Paneer Tikka Shashlik');

  // Discount food banner
  content = content.replace(/<h2>Chessey Pizza<\/h2>/g, '<h2>Awadhi Dum Pukht</h2>');

  // Food Menu Tabs
  content = content.replace(
    /<a href="#Burger" data-bs-toggle="tab" class="nav-link active">\s*Beef Burger\s*<\/a>/g,
    '<a href="#Burger" data-bs-toggle="tab" class="nav-link active">\n                                        Tandoori Starters\n                                    </a>'
  );
  content = content.replace(
    /<a href="#Pizza" data-bs-toggle="tab" class="nav-link">\s*Chicken Pizza\s*<\/a>/g,
    '<a href="#Pizza" data-bs-toggle="tab" class="nav-link">\n                                        Royal Biryanis\n                                    </a>'
  );
  content = content.replace(
    /<a href="#Fresh" data-bs-toggle="tab" class="nav-link">\s*Fresh Pasta\s*<\/a>/g,
    '<a href="#Fresh" data-bs-toggle="tab" class="nav-link">\n                                       Shahi Curries\n                                    </a>'
  );
  content = content.replace(
    /<a href="#Sushi" data-bs-toggle="tab" class="nav-link">\s*Hot Sushi\s*<\/a>/g,
    '<a href="#Sushi" data-bs-toggle="tab" class="nav-link">\n                                       Palace Kebabs\n                                    </a>'
  );
  content = content.replace(
    /<a href="#Juice" data-bs-toggle="tab" class="nav-link">\s*Drink & Juice\s*<\/a>/g,
    '<a href="#Juice" data-bs-toggle="tab" class="nav-link">\n                                       Artisanal Beverages\n                                    </a>'
  );

  // Tab dish details
  content = content.replace(/Burger, coke, fries, chicken nuggets/g, 'Charcoal smoked, saffron marinade, royal palace recipe');
  content = content.replace(/Cheesy Beef Nachos/g, 'Kakori Galouti Kebab');
  content = content.replace(/Grilled Chicken Sub/g, 'Murgh Malai Tikka');
  content = content.replace(/Cheesy Garlic Cream/g, 'Paneer Tikka Shashlik');
  content = content.replace(/Spicy Chicken Nuggets/g, 'Tandoori Jheenga');
  content = content.replace(/Deluxe Club Sandwich/g, 'Kashmiri Rogan Josh');
  content = content.replace(/Crunchy Fish Burger/g, 'Dal Makhani Bukhara');
  content = content.replace(/Crispy Onion Rings/g, 'Shahi Tukda with Rabdi');

  // Combo section in index.html
  content = content.replace(/The Best Quality for <br>\s*Combo Burger/g, 'The Imperial Maharaja <br> Shahi Dastarkhwan');
  content = content.replace(/Foodies is a unique and independent <br>\s*quick service brand\./g, 'Rang Mahal presents an unmatched heritage dining experience <br> celebrating centuries of regal culinary excellence.');

  return content;
}

// Global replacements across all HTML files
const globalReplacements = [
  // Residual Foodies text
  {
    from: /Foodies is a certified B Corp, as we believe in business as a force for good\. We create both super indulgent and healthier\./g,
    to: 'Rang Mahal is committed to sustainable culinary heritage, ethical sourcing from organic spice farms, and pure artisanal gastronomy.'
  },
  {
    from: /Dinnerware, flatware and barware at Foodies\./g,
    to: 'Handcrafted royal copperware, brass thalis and palace tableware at Rang Mahal.'
  },
  {
    from: /Savoring your taste buds with Foodies/g,
    to: 'Savoring your taste buds at Rang Mahal'
  },
  {
    from: /<!-- Visit Foodies Section Start -->/g,
    to: '<!-- Visit Rang Mahal Section Start -->'
  },
  {
    from: /Visit Foodies Restaurant/g,
    to: 'Visit Rang Mahal Restaurant'
  },
  {
    from: /<div class="testi-text">\s*Foodies\s*<\/div>/g,
    to: '<div class="testi-text">\n                                Rang Mahal\n                            </div>'
  },
  {
    from: /<div class="choose-text d-none d-xl-block">\s*Foodies\s*<\/div>/g,
    to: '<div class="choose-text d-none d-xl-block">\n                            Rang Mahal\n                        </div>'
  },
  // In index-5.html testimonial
  {
    from: /“I just wanted to thank you for the work that has been carried out\. We are all delighted! Your lads are a credit to any company”\./g,
    to: '“Dining at Rang Mahal is like being transported to the grand royal courts of Rajasthan and Awadh. Every kebab melts effortlessly, and the saffron aromas are unforgettable.”'
  },
  {
    from: /<h3 class="title-2">William John<\/h3>\s*<p>\s*Customer\s*<\/p>/g,
    to: '<h3 class="title-2">Vir Sanghvi</h3>\n                                                        <p>\n                                                            Celebrated Food Critic & Author\n                                                        </p>'
  },
  // Price upgrades for standard meals (from template $19/$29 to realistic INR)
  {
    from: /<span class="price">₹19<\/span>/g,
    to: '<span class="price">₹425</span>'
  },
  {
    from: /<span class="price">₹29<\/span>/g,
    to: '<span class="price">₹550</span>'
  }
];

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  if (file === 'index.html') {
    content = polishIndexHtml(content);
  }

  globalReplacements.forEach(({ from, to }) => {
    content = content.replace(from, to);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated: ${file}`);
  }
});

console.log(`Finished polish! Updated ${updatedCount} files.`);
