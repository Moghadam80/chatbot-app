// This script generates placeholder images for all products
const fs = require('fs');
const path = require('path');
const products = require('../src/data/products.json');

// Ensure the images directory exists
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Read the placeholder SVG
const placeholderSvg = fs.readFileSync(path.join(imagesDir, 'placeholder.svg'), 'utf8');

// Generate a placeholder image for each product
products.forEach(product => {
  const imagePath = product.image;
  const fileName = path.basename(imagePath);
  const filePath = path.join(imagesDir, fileName);
  
  // Create a custom SVG for each product
  const customSvg = placeholderSvg.replace('Product Image', product.name);
  
  // Write the file
  fs.writeFileSync(filePath, customSvg);
  console.log(`Created placeholder image for ${product.name} at ${filePath}`);
});

console.log('All product placeholder images have been generated!'); 