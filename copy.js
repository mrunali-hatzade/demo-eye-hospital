const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\27a7eb51-6de8-49f3-8fa7-3cd3bf44597d';
const destDir = 'd:\\DEMO WEBSITES\\hospital\\eye';

const files = [
  { src: 'doctor_rajesh_1781724803670.png', dest: 'doctor-rajesh.png' },
  { src: 'doctor_priya_1781724816210.png', dest: 'doctor-priya.png' },
  { src: 'doctor_arjun_1781724829349.png', dest: 'doctor-arjun.png' },
  { src: 'doctor_ananya_1781724847298.png', dest: 'doctor-ananya.png' }
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const destPath = path.join(destDir, f.dest);
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully copied ${f.src} to ${f.dest}`);
  } catch (err) {
    console.error(`Failed to copy ${f.src}:`, err.message);
  }
});
