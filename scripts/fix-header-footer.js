const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let updatedFiles = 0;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Replace email yordomain@gmial.com with official email
  content = content.replace(/yordomain@gmial\.com/g, 'delhi@rangmahal.in');

  // 2. Replace phone text +1 718-904 4450 or +1 718-904-4450
  content = content.replace(/\+1 718-904 4450/g, '+91 11 4982 7700');
  content = content.replace(/\+1 718-904-4450/g, '+91 11 4982 7700');
  content = content.replace(/tel:\+1718-9044450/g, 'tel:+911149827700');

  // 3. Replace Kentucky address with New Delhi Flagship Palace
  content = content.replace(/4517 Washington Ave\.\s*Manch\s*ester,\s*Kentucky\s*39495/g, '14, Connaught Circle, Connaught Place, New Delhi - 110001');
  content = content.replace(/4517 Washington Ave\.\s*Manch\s*\r?\n\s*ester,\s*Kentucky\s*39495/g, '14, Connaught Circle, Block F,\n                                                        Connaught Place, New Delhi - 110001');

  // 4. In index.html: Headquater - -> Flagship Palace -
  content = content.replace(/<h3>Headquater -<\/h3>/g, '<h3>Flagship Palace -</h3>');

  // 5. Replace magnifying glass icon on address in footer with location-dot
  content = content.replace(/<i class="fa-solid fa-magnifying-glass"><\/i>\s*14, Connaught Circle/g, '<i class="fa-solid fa-location-dot"></i> 14, Connaught Circle');

  // 6. In footer widget columns: Fix 5-column grid widths so they sum to 12 in xl/xxl and don't wrap
  content = content.replace(
    /class="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 wow fadeInUp"/g,
    'class="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"'
  );
  content = content.replace(
    /class="col-xxl-2 col-xl-3 col-lg-2 col-md-3 col-sm-6 wow fadeInUp"/g,
    'class="col-xxl-2 col-xl-2 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"'
  );
  content = content.replace(
    /class="col-xxl-3 col-xl-3 col-lg-4 col-md-5 col-sm-6 wow fadeInUp"/g,
    'class="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"'
  );
  content = content.replace(
    /class="col-xxl-2 col-xl-3 col-lg-3 ps-xl-5 col-md-6 col-sm-6 col-6 wow fadeInUp"/g,
    'class="col-xxl-2 col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6 wow fadeInUp"'
  );
  content = content.replace(
    /class="col-xxl-2 col-xl-3 col-lg-4 ps-xxl-5 col-md-6 col-sm-6 col-6 wow fadeInUp"/g,
    'class="col-xxl-2 col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6 wow fadeInUp"'
  );

  // 7. Replace fast food items in footer list with royal Indian specialties
  content = content.replace(/<i class="fa-solid fa-chevron-right"><\/i> BBQ Pizza TinTin/g, '<i class="fa-solid fa-chevron-right"></i> Awadhi Dum Biryani');
  content = content.replace(/<i class="fa-solid fa-chevron-right"><\/i> Burger Kingo/g, '<i class="fa-solid fa-chevron-right"></i> Murgh Malai Tikka');
  content = content.replace(/<i class="fa-solid fa-chevron-right"><\/i> Chicken Sandwich/g, '<i class="fa-solid fa-chevron-right"></i> Kakori Seekh Kebab');
  content = content.replace(/<i class="fa-solid fa-chevron-right"><\/i> Chocolate Donuts/g, '<i class="fa-solid fa-chevron-right"></i> Kashmiri Rogan Josh');
  content = content.replace(/<i class="fa-solid fa-chevron-right"><\/i> French Fries/g, '<i class="fa-solid fa-chevron-right"></i> Dal Makhani Bukhara');

  // Also replace Our Products widget title in footer with Our Specialties
  content = content.replace(/<span class="widget-title">Our Products<\/span>/g, '<span class="widget-title">Our Specialties</span>');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedFiles++;
    console.log(`Updated footer & contact in: ${file}`);
  }
});

console.log(`Finished updating ${updatedFiles} files.`);
