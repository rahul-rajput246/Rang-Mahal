const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

const PAGE_TITLES = {
  'index.html': 'Rang Mahal – Royal Indian Palace Cuisine & Craft Tandoor',
  'index-2.html': 'Rang Mahal – Royal Indian Dining & Heritage Kitchen',
  'index-3.html': 'Rang Mahal – Royal Indian Feast & Tandoor Lounge',
  'index-4.html': 'Rang Mahal – Royal Palace Gastronomy & Bistro',
  'index-5.html': 'Rang Mahal – Imperial Indian Dining & Banquet',
  'index-6.html': 'Rang Mahal – Royal Clay Tandoor & Grill House',
  'index-7.html': 'Rang Mahal – Heritage Indian Street Food & Kebabs',
  'index-8.html': 'Rang Mahal – Royal Awadhi Dum Pukht & Biryani',
  'index-9.html': 'Rang Mahal – Grand Indian Palace Dining & Cafe',
  'index-10.html': 'Rang Mahal – Royal Mughlai Kitchen & Lounge',
  'index-11.html': 'Rang Mahal – Artisanal Indian Dining & Sweets',
  'about.html': 'Our Royal Heritage | Rang Mahal – Indian Palace Cuisine',
  'contact.html': 'Contact & Royal Palaces | Rang Mahal',
  'menu.html': 'Royal Dastarkhwan Menu | Rang Mahal',
  'reservation.html': 'Reserve a Royal Table | Rang Mahal',
  'history.html': 'Our Royal Lineage & Heritage | Rang Mahal',
  'team.html': 'Master Ustads & Culinary Chefs | Rang Mahal',
  'team-details.html': 'Executive Chef Profile | Rang Mahal',
  'gallery.html': 'Palace Dining Gallery | Rang Mahal',
  'faq.html': 'Guest Inquiries & FAQ | Rang Mahal',
  'shop.html': 'Royal Gourmet Pantry & Spices | Rang Mahal',
  'shop-details.html': 'Artisanal Spice Details | Rang Mahal Pantry',
  'shop-list.html': 'Royal Pantry Catalog | Rang Mahal',
  'shop-grid-sidebar.html': 'Gourmet Indian Spices & Delicacies | Rang Mahal',
  'shop-list-sidebar.html': 'Pantry Collection | Rang Mahal',
  'shop-cart.html': 'Your Royal Hamper Cart | Rang Mahal',
  'checkout.html': 'Order Checkout | Rang Mahal',
  'wishlist.html': 'Saved Delicacies | Rang Mahal',
  'news.html': 'Royal Culinary Chronicles | Rang Mahal Blog',
  'news-grid.html': 'Indian Gastronomy Journal | Rang Mahal',
  'news-details.html': 'Art of Royal Dum Pukht | Rang Mahal',
  'order-tracking.html': 'Live Kitchen Order Tracking | Rang Mahal',
  'view-order-tracking.html': 'Dispatch & Delivery Tracking | Rang Mahal',
  'privacy-policy.html': 'Privacy & Guest Policy | Rang Mahal',
  'sign-in.html': 'Royal Connoisseur Club Sign In | Rang Mahal',
  'sign-up.html': 'Join Royal Connoisseur Club | Rang Mahal',
  'forget-password.html': 'Reset Password | Rang Mahal',
  'verify.html': 'Verify Royal Account | Rang Mahal',
  'new-password.html': 'Create New Password | Rang Mahal',
  'coming-soon.html': 'A New Palace Opening Soon | Rang Mahal',
  '403.html': 'Access Denied | Rang Mahal',
  '404.html': 'Page Not Found | Rang Mahal',
  '500.html': 'Server Error | Rang Mahal',
  'testimonial.html': 'Patron Testimonials & Reviews | Rang Mahal'
};

const INDIA_MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.11487332345!2d77.21089694294432!3d28.63242918804924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b027d109%3A0x1054c407519985a2!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin';

const files = fs.readdirSync(baseDir).filter(f => f.endsWith('.html'));

let totalHttrackPurged = 0;

files.forEach(file => {
  const filePath = path.join(baseDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Purge HTTrack Comments
  const httrackMatches = content.match(/<!--\s*(?:Mirrored from|Added by HTTrack)[\s\S]*?-->\r?\n?/g);
  if (httrackMatches) {
    totalHttrackPurged += httrackMatches.length;
    content = content.replace(/<!--\s*(?:Mirrored from|Added by HTTrack)[\s\S]*?-->\r?\n?/g, '');
  }

  // 2. Fix 404 scraper residue file references
  content = content.replace(/blog-details\.html/g, 'news-details.html');
  content = content.replace(/shop-\.html/g, 'shop.html');
  content = content.replace(/new-password-2\.html/g, 'new-password.html');
  content = content.replace(/unsupported value for Color\.html/g, '#');

  // 3. Remove wowtheme7 / ThemeForest URLs
  content = content.replace(/https:\/\/wowtheme7\.com\/tf\/foodies\/contact\.php/g, '#');
  content = content.replace(/https:\/\/wowtheme7\.com\/tf\/foodies\//g, '');
  content = content.replace(/<meta name="author" content="[^"]*">/g, '<meta name="author" content="Rang Mahal Royal Dining">');

  // 4. Update title
  const pageTitle = PAGE_TITLES[file] || 'Rang Mahal – Royal Indian Palace Cuisine & Craft Tandoor';
  content = content.replace(/<title>[\s\S]*?<\/title>/, `<title>${pageTitle}</title>`);

  // 5. Update meta description
  content = content.replace(/<meta name="description" content="[^"]*">/g, '<meta name="description" content="Rang Mahal – Royal Indian Palace Cuisine & Craft Tandoor. Experience authentic Awadhi dum pukht, clay tandoor kebabs, fragrant basmati biryanis, and royal hospitality in India.">');

  // 6. Replace Map iframes with Indian map
  content = content.replace(/https:\/\/www\.google\.com\/maps\/embed\?pb=[^"]*Envato[^"]*/g, INDIA_MAP_URL);

  // 7. Update Phone numbers
  content = content.replace(/\(234\) 109-6666/g, '+91 11 4982 7700');
  content = content.replace(/tel:2341096666/g, 'tel:+911149827700');
  content = content.replace(/\+43 563 5333 423/g, '+91 11 4982 7700');
  content = content.replace(/tel:\+435635333423/g, 'tel:+911149827700');
  content = content.replace(/\(234\) 244-6666/g, '+91 98110 45678');
  content = content.replace(/tel:2342446666/g, 'tel:+919811045678');
  content = content.replace(/\+1 234 567 890/g, '+91 98110 45678');
  content = content.replace(/tel:\+1234567890/g, 'tel:+919811045678');
  content = content.replace(/\+234 892 233/g, '+91 98110 45678');
  content = content.replace(/\+234 987 889/g, '+91 11 4982 7700');

  // 8. Update Emails
  content = content.replace(/hellofodies@gmail\.com/g, 'reservations@rangmahal.in');
  content = content.replace(/fodies@gmail\.com/g, 'concierge@rangmahal.in');
  content = content.replace(/foodies@gmail\.com/g, 'info@rangmahal.in');
  content = content.replace(/demo@gmail\.com/g, 'reservations@rangmahal.in');
  content = content.replace(/support@foddies\.org/g, 'concierge@rangmahal.in');

  // 9. Update Currency & Language in select boxes
  content = content.replace(/<option>USD<\/option>/g, '<option>INR (₹)</option>');
  content = content.replace(/<option>DLR<\/option>/g, '<option>INR (₹)</option>');
  content = content.replace(/<option>UDX<\/option>/g, '<option>INR (₹)</option>');
  content = content.replace(/<option>EN<\/option>/g, '<option>EN (India)</option>');
  content = content.replace(/<option>AU<\/option>/g, '<option>HI (Hindi)</option>');
  content = content.replace(/<option>NZ<\/option>/g, '<option>UR (Urdu)</option>');

  // 10. Update copyright
  content = content.replace(/Copyright © <b>Foodies<\/b> All rights reserved\./g, 'Copyright © <b>Rang Mahal</b>. All rights reserved.');
  content = content.replace(/Copyright © 2026 All Rights Reserved\./g, 'Copyright © 2026 Rang Mahal – Royal Indian Palace Dining. All rights reserved.');
  content = content.replace(/Copyright © <b>Foodies<\/b>/g, 'Copyright © <b>Rang Mahal</b>');

  // 11. Replace foreign addresses with Central Delhi flagship address
  content = content.replace(/575 Main Street, D-block, 2nd <br> floor, South Africa/g, '14, Connaught Circle, Block F, Connaught Place, New Delhi - 110001');
  content = content.replace(/575 Main Street, D-block, 2nd floor, South Africa/g, '14, Connaught Circle, Block F, Connaught Place, New Delhi - 110001');

  // 12. Update logo alt texts
  content = content.replace(/alt="logo-img"/g, 'alt="Rang Mahal Logo"');
  content = content.replace(/alt="foodie-logo"/g, 'alt="Rang Mahal Logo"');

  // 13. Currency symbol in pricing: Replace $ prices with ₹
  // Replace $xx.xx or $xx with ₹
  content = content.replace(/\$([0-9]+(?:\.[0-9]{2})?)/g, '₹$1');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log(`Processing complete. Total HTTrack comments purged: ${totalHttrackPurged}`);
