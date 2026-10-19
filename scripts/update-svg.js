const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const mainLogoPath = path.join(rootDir, 'assets', 'img', 'logo', 'rang-mahal-logo.png');
const mainBuf = fs.readFileSync(mainLogoPath);
const mainB64 = mainBuf.toString('base64');

// 1. footer-logo.svg for white footer background
const footerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1035 355" width="220" height="75">
  <image href="data:image/png;base64,${mainB64}" width="1035" height="355" />
</svg>`;
fs.writeFileSync(path.join(rootDir, 'assets', 'img', 'home-1', 'footer-logo.svg'), footerSvg);

// 2. vector logo in assets/img/logo/rang-mahal-logo.svg
fs.writeFileSync(path.join(rootDir, 'assets', 'img', 'logo', 'rang-mahal-logo.svg'), footerSvg);

// 3. Copy to all footer logo png files
const footerTargets = [
  'assets/img/home-1/footer-logo.png',
  'assets/img/home-4/footer-logo.png',
  'assets/img/home-5/footer-logo.png',
  'assets/img/home-6/footer-logo.png',
  'assets/img/home-8/footer-logo.png',
  'assets/img/home-10/footer-logo.png',
  'assets/img/home-11/footer-logo.png'
];

footerTargets.forEach(rel => {
  const target = path.join(rootDir, rel);
  fs.copyFileSync(mainLogoPath, target);
  console.log(`Copied to ${rel}`);
});

console.log('Successfully updated all logo files!');
