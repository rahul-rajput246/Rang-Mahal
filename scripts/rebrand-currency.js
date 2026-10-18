const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let updated = 0;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace £ with ₹
  content = content.replace(/£14\.90/g, '₹490');
  content = content.replace(/£([0-9]+(?:\.[0-9]{2})?)/g, '₹$1');

  // Fix low single-digit prices like ₹09, ₹15, ₹17, ₹21, ₹25 in menu and cards
  content = content.replace(/<span class="price">₹09<\/span>/g, '<span class="price">₹295</span>');
  content = content.replace(/<span class="price">₹15<\/span>/g, '<span class="price">₹245</span>');
  content = content.replace(/<span class="price">₹17<\/span>/g, '<span class="price">₹385</span>');
  content = content.replace(/<span class="price">₹21<\/span>/g, '<span class="price">₹545</span>');
  content = content.replace(/<span class="price">₹25<\/span>/g, '<span class="price">₹465</span>');

  // Also in menu.html line 613: Crispy Onion Rings -> Bhatti Ka Paneer Tikka
  content = content.replace(/<h3 class="title">Crispy Onion Rings<\/h3>/g, '<h3 class="title">Bhatti Ka Paneer Tikka</h3>');

  // Also replace burger aroma in menu.html
  content = content.replace(/The mouth-watering aroma of sizzling burgers now fills/g, 'The captivating aroma of charcoal-smoked kebabs and fragrant dum biryanis fills the palace');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log(`Updated pricing & currency in ${file}`);
  }
});

console.log(`Finished updating ${updated} files.`);
