const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const brokenTitles = [
  'Formal Oxford Shoes',
  'Floral Print Kurti',
  'Cotton Pajama Set',
  'Pro Wireless Earbuds',
  'Non-Stick Cookware Set',
  'Soft Plush Teddy Bear',
  'Kids Bicycle with Trainers',
  'Car Vacuum Cleaner',
  'Dashboard Camera',
  'Car Air Purifier',
  'Motorcycle Helmet',
  'Tire Inflator Air Pump',
  'Organic Green Tea',
  'Premium Basmati Rice 5kg',
  'Mixed Dry Fruits 1kg',
  'Pure Honey 500g'
];

function getPlaceholder(title) {
  const encoded = encodeURIComponent(title.replace(/ /g, '\n'));
  return `https://placehold.co/600x600/f8fafc/334155?text=${encoded}`;
}

async function fixBrokenImages() {
    // 1. Update DB
    await mongoose.connect(process.env.MONGO_URI);
    const Product = mongoose.connection.db.collection('products');
    
    for (const title of brokenTitles) {
        const placeholder = getPlaceholder(title);
        await Product.updateOne(
            { title: title },
            { $set: { image: placeholder, images: [placeholder, placeholder] } }
        );
    }
    console.log('Database updated.');
    mongoose.connection.close();

    // 2. Update App.js
    let code = fs.readFileSync('c:/Users/Lenovo/Desktop/Sahara/Sahara/frontend/src/App.js', 'utf8');
    for (const title of brokenTitles) {
        const placeholder = getPlaceholder(title);
        // Find the object with this title in INITIAL_PRODUCTS and replace its image and images
        // We can do this with regex for each title.
        const regex = new RegExp(`({[^}]*title:\\s*"${title}"[^}]*image:\\s*)"([^"]+)"(,\\s*images:\\s*\\["[^"]*",\\s*"[^"]*"\\])?`, 'g');
        code = code.replace(regex, `$1"${placeholder}", images: ["${placeholder}", "${placeholder}"]`);
    }
    
    fs.writeFileSync('c:/Users/Lenovo/Desktop/Sahara/Sahara/frontend/src/App.js', code);
    console.log('App.js updated.');
}

fixBrokenImages().catch(console.error);
