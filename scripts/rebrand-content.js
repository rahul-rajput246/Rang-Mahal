const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(baseDir).filter(f => f.endsWith('.html'));

const REPLACEMENTS = [
  // Healthcare / Landscaping template artifacts
  {
    search: /Foodies delivers exceptional healthcare with advanced technology and compassionate care\. Your health and well-being are always our top priority\./g,
    replace: 'Rang Mahal delivers exceptional royal Indian palace hospitality, slow-cooked culinary artistry, and heartfelt warmth. Your dining pleasure is our highest honor.'
  },
  {
    search: /Foodies delivers exceptional healthcare with advanced technology and compassionate care\./g,
    replace: 'Rang Mahal delivers exceptional royal Indian palace hospitality and slow-cooked culinary artistry.'
  },
  {
    search: /For nearly 20 years, Foodies Landscape Services has been USA’s premiern landscape partner for excellence! Our rich legacy is rooted in our gardening unwavering commitment to turning/g,
    replace: "For over three decades, Rang Mahal has been India's premier palace restaurant for royal dining excellence. Our rich heritage is rooted in an unwavering commitment to royal Awadhi, Rajputana, and Mughlai culinary traditions."
  },
  {
    search: /At Foodies we provide the fresh garden products for you\. Contact for your order/g,
    replace: 'At Rang Mahal, we curate authentic handpicked spices, Vedic A2 ghee, and royal feast delicacies for you. Reserve your table or order online.'
  },
  {
    search: /Find top-rated dinnerware, flatware and barware at Foodies\./g,
    replace: 'Experience royal Indian clay tandoor cooking, rich curries, and palace hospitality at Rang Mahal.'
  },
  {
    search: /Top-rated dinnerware, flatware and barware at Foodies\./g,
    replace: 'Experience royal Indian clay tandoor cooking, rich curries, and palace hospitality at Rang Mahal.'
  },
  {
    search: /Foodies is a unique and independent quick service brand\. Fazfood burgers and shakes are made pretty hot and tasty\. The ultimate “melt in your mouth” experience\./g,
    replace: "Rang Mahal is India's premier royal fine dining destination. Our signature galouti kebabs, dum pukht biryanis, and slow-simmered curries are crafted using authentic recipes of the royal courts."
  },

  // Agriculture text in About page
  {
    search: /We’re Making the <br>\s*Best burger for You/g,
    replace: 'A Legacy of Royal Flavors <br> & Craft Tandoor Cooking'
  },
  {
    search: /We prioritize eco-friendly practices that protect natural resources and ensure long-term agricultural productivity for generations\. Every solution we offer is designed to support farmers\./g,
    replace: "At Rang Mahal, we preserve the timeless culinary heritage of India's royal courts. Every delicacy is slow-cooked over charcoal embers in traditional brass degs with hand-ground organic spices from Rajasthan and Kashmir."
  },
  {
    search: /Gourmet Mushrooms/g,
    replace: 'Handpicked Kashmiri Saffron'
  },
  {
    search: /Argo Farming/g,
    replace: 'Royal Awadhi Dum Pukht'
  },
  {
    search: /Fertilizer Distribution/g,
    replace: 'Pure A2 Vedic Desi Ghee'
  },
  {
    search: /Multifunctional Farming/g,
    replace: 'Traditional Clay Tandoor'
  },

  // Fish species text
  {
    search: /Temperate ocean-bass sea chub unicorn\s*treefish eulachon tidewater goby\./g,
    replace: 'Authentic royal Indian delicacies crafted with hand-ground spices and time-honored slow-cooking techniques.'
  },
  {
    search: /Temperate ocean-bass sea chub unicorn treefish eulachon tidewater goby\./g,
    replace: 'Authentic royal Indian delicacies crafted with hand-ground spices and time-honored slow-cooking techniques.'
  },

  // Reservation OpenTable & Phone
  {
    search: /Make online reservations, read restaurant reviews from dinners, and earn points towards free meals\. OpenTable is a real time online reservation\./g,
    replace: 'Reserve your royal dining table, private palace chamber, or celebration banquet with our dedicated royal concierge desk.'
  },
  {
    search: /\+1 718-904-4450/g,
    replace: '+91 11 4982 7700'
  },
  {
    search: /tel:\+17189044450/g,
    replace: 'tel:+911149827700'
  },

  // History Canada / Pizza text
  {
    search: /Delivering Awesome Since 1960/g,
    replace: 'Preserving Royal Gastronomy Since 1988'
  },
  {
    search: /Time flies when you do what you love\. We know because we’ve been making great pizza since 1967\. Along the way, we’ve grown to more than 750 restaurants from coast to coast, becoming a trusted brand and leader in the foodservice industry\. We’re proud of the quality food we make – and the difference we make in communities across Canada\. We’ve made a lot of pies and memories over the years\. Find out what goes into both!/g,
    replace: "The saga of Rang Mahal began with deep reverence for the culinary heritage of India's royal courts. Sourcing precious Mongra saffron from Kashmir, stone-ground coriander from Rajasthan, and cold-pressed organic oils, our master Ustads have spent four decades perfecting Awadhi Dum Pukht, clay-oven tandoor kebabs, and signature slow-simmered gravies that have enchanted royalty, statesmen, and food connoisseurs worldwide."
  },
  {
    search: /Time flies when you do what you love\. We know because we’ve been making great pizza since 1967\. Along the way, we’ve grown to more than 750 restaurants from coast to coast, becoming a trusted brand and leader in the foodservice industry\./g,
    replace: 'Rang Mahal originated in the historic heart of Old Delhi with a vision to preserve the royal banquet recipes of ancient emperors and nawabs. Every creation is an ode to the timeless art of Indian fine dining.'
  },

  // Chef details & consulting resume text
  {
    search: /<span class="top-text wow fadeInUp">CEO, Founder<\/span>\s*<h2 class="wow fadeInUp" data-wow-delay="\.2s">Willam Carter<\/h2>/g,
    replace: '<span class="top-text wow fadeInUp">Executive Master Chef</span>\n<h2 class="wow fadeInUp" data-wow-delay=".2s">Maharaja Digvijay Singh</h2>'
  },
  {
    search: /He whimsically named Egg Canvas is the brainchild of Erica Choi, a design director and photo Sit amet consect velit integer tincidunt scelerisque volutpat neque fermeny massa lacus\./g,
    replace: 'Grand Master Chef Digvijay Singh is the culinary visionary of Rang Mahal, bringing four decades of slow-cooking Dum Pukht mastery, ancestral royal spice formulations, and clay-tandoor artistry to India’s most prestigious dining destination.'
  },
  {
    search: /Finance Consulting/g,
    replace: 'Royal Awadhi Dum Pukht'
  },
  {
    search: /Business Strategy/g,
    replace: 'Traditional Clay Tandoor Mastery'
  },
  {
    search: /\+\(123\) 8854-432-9520/g,
    replace: '+91 11 4982 7700'
  },
  {
    search: /tel:\+12388544329520/g,
    replace: 'tel:+911149827700'
  },
  {
    search: /3770 Hidden Meadow Drive Venturia, ND 58489/g,
    replace: '14, Connaught Circle, Block F, Connaught Place, New Delhi - 110001'
  },
  {
    search: /yourname@example\.com/g,
    replace: 'chef.digvijay@rangmahal.in'
  },
  {
    search: /Leadership Development/g,
    replace: 'Awadhi Royal Court Lineage'
  },
  {
    search: /M\.D\. of Business Degrees/g,
    replace: 'Master of Traditional Clay Tandoor'
  },
  {
    search: /Best Quality Services/g,
    replace: 'Secret 32-Spice Garam Masala'
  },
  {
    search: /Best Training/g,
    replace: 'Slow Dum Pukht Brass Deg Specialist'
  },
  {
    search: /Meet the Deadlines/g,
    replace: '35+ Years of Culinary Prestige'
  },
  {
    search: /Experience Certificate/g,
    replace: 'Master Ustad of Northern Indian Flavors'
  },

  // Team chefs
  {
    search: />Jonathan Bean<\/a>/g,
    replace: '>Chef Ranveer Rathore</a>'
  },
  {
    search: />Mike Fermalin<\/a>/g,
    replace: '>Chef Harpal Singh</a>'
  },
  {
    search: />Shikhon Islam<\/a>/g,
    replace: '>Chef Priya Sengupta</a>'
  },
  {
    search: /Burger Chiefs/g,
    replace: 'Master Culinary Chef'
  },

  // Feature menu items in reservation
  {
    search: /TESTY &amp; SPICY/g,
    replace: 'ROYAL TANDOOR'
  },
  {
    search: /TESTY & SPICY/g,
    replace: 'ROYAL TANDOOR'
  },
  {
    search: /QUALITY FOODS/g,
    replace: 'HERITAGE SPICES'
  },
  {
    search: /ORIGINAL RECIPES/g,
    replace: 'AWADHI DUM PUKHT'
  },
  {
    search: /FAST DELIVERY/g,
    replace: 'ROYAL BANQUETS'
  },

  // Testimonials Cicero and Type specimen
  {
    search: /“ Make a type specimen book\. It has survived not only five centuries, but also the leap into electronic typesetting, remaining\.”/g,
    replace: '“The 24-hour slow-cooked Dal Rang Mahal and the delicate Galouti Kebab are among the finest renditions of royal Indian gastronomy in the country. A triumphant tribute to Indian culinary heritage.”'
  },
  {
    search: /<div class="name">Esther Howard<\/div>\s*<p>Customer<\/p>/g,
    replace: '<div class="name">Vir Sanghvi</div>\n<p>Senior Food & Hospitality Critic</p>'
  },
  {
    search: /On the other hand denounce righteous indignation and dislike men who beguile and demoralize charms pleasure the moment\./g,
    replace: 'Dining at Rang Mahal feels like being an honored guest at a royal court banquet. The smoky tandoori kebabs, rich makhani gravies, and live sitar recitals create an unforgettable ambiance.'
  },
  {
    search: /<h6>Somilla D\. Silva<\/h6>\s*<span>Green Garden Owner<\/span>/g,
    replace: '<h6>Dr. Sameer Roy</h6>\n<span>Diplomatic Connoisseur, New Delhi</span>'
  },

  // Pizza topping text on drinks/burgers in menu.html
  {
    search: /Gorgonzola, mozzarella, taleggio Red onions, capers, olives Porem ipsum dolor sit amet, consectetur/g,
    replace: 'Prepared with hand-ground organic Indian spices, slow-cooked in traditional clay tandoors, and finished with fresh herbs.'
  },

  // FAQ Latin
  {
    search: /There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable/g,
    replace: 'Reservations can be booked online through our portal or by contacting our Royal Concierge at +91 11 4982 7700. We recommend booking 2 to 4 days in advance for weekend dinners and private palace chambers.'
  },

  // Dishes in Menu
  {
    search: /<h3 class="title">Soda Lemon Juice<\/h3>/g,
    replace: '<h3 class="title">Royal Kesar Badam Thandai</h3>'
  },
  {
    search: /<h3 class="title">Hot Chicken Pizza<\/h3>/g,
    replace: '<h3 class="title">Murgh Malai Tikka</h3>'
  },
  {
    search: /<h3 class="title">Spicy Chicken Grill<\/h3>/g,
    replace: '<h3 class="title">Tandoori Jheenga (Bay Prawns)</h3>'
  },
  {
    search: /<h3 class="title">Spicy Beef Burrito<\/h3>/g,
    replace: '<h3 class="title">Royal Awadhi Dum Biryani</h3>'
  },
  {
    search: /<h3 class="title">Chicken Black Grill<\/h3>/g,
    replace: '<h3 class="title">Kashmiri Rogan Josh</h3>'
  },
  {
    search: /<h3 class="title">Spicy Chicken Sandwitch<\/h3>/g,
    replace: '<h3 class="title">Shahi Paneer Khas</h3>'
  },
  {
    search: /<h3 class="title">Soda Orange Juice<\/h3>/g,
    replace: '<h3 class="title">Kashmiri Kahwa Green Tea</h3>'
  },
  {
    search: /<h3 class="title">Classic Chicken Tacos<\/h3>/g,
    replace: '<h3 class="title">Kakori Kebab with Sheermal</h3>'
  },
  {
    search: /<h3 class="title">Happy Lunch Combo<\/h3>/g,
    replace: '<h3 class="title">Maharaja Royal Thali Feast</h3>'
  },

  // Dishes in Shop
  {
    search: />Classic Beef Hotdog<\/a>/g,
    replace: '>Royal Kashmiri Mongra Saffron (5g)</a>'
  },
  {
    search: />Crispy Onion Rings<\/a>/g,
    replace: '>Vedic A2 Gir Cow Bilona Ghee (500ml)</a>'
  },

  // Checkout Payment options
  {
    search: /<label for="paypal">PayPal<\/label>/g,
    replace: '<label for="paypal">UPI (GPay / PhonePe / Paytm)</label>'
  },
  {
    search: /<label for="payoneer">Payoneer<\/label>/g,
    replace: '<label for="payoneer">Net Banking (SBI / HDFC / ICICI)</label>'
  },
  {
    search: /<label for="fastPay">Fastpay<\/label>/g,
    replace: '<label for="fastPay">Cash on Delivery / Dining Voucher</label>'
  },

  // Country select in checkout
  {
    search: /<select class="single-select w-100">\s*<option>USA<\/option>\s*<option>Aus<\/option>\s*<option>UK<\/option>\s*<\/select>/g,
    replace: '<select class="single-select w-100"><option>India (Delhi NCR)</option><option>India (Maharashtra)</option><option>India (Karnataka)</option><option>India (Rajasthan)</option><option>India (Uttar Pradesh)</option><option>India (Tamil Nadu)</option><option>India (West Bengal)</option><option>India (Gujarat)</option></select>'
  },

  // Banner text in about
  {
    search: /Yummy <br> Delicious Hot <br> Pizza/g,
    replace: 'Royal <br> Saffron Spiced <br> Feast'
  }
];

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(baseDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  REPLACEMENTS.forEach(r => {
    content = content.replace(r.search, r.replace);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Content updated in ${file}`);
  }
});

console.log(`Content overhaul completed across ${updatedCount} files.`);
