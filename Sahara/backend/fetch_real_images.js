const https = require('https');
const mongoose = require('mongoose');
const fs = require('fs');
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

const fetchImage = (query) => {
    return new Promise((resolve, reject) => {
        const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=1`;
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.results && json.results.length > 0) {
                        resolve(json.results[0].urls.regular);
                    } else {
                        resolve(null);
                    }
                } catch(e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
};

async function fixBrokenImages() {
    await mongoose.connect(process.env.MONGO_URI);
    const Product = mongoose.connection.db.collection('products');
    let code = fs.readFileSync('c:/Users/Lenovo/Desktop/Sahara/Sahara/frontend/src/App.js', 'utf8');

    for (const title of brokenTitles) {
        console.log(`Searching image for: ${title}...`);
        let imageUrl = await fetchImage(title);
        if (!imageUrl) {
            // Fallback keywords if exact title yields no results
            const fallbackMap = {
                'Kids Bicycle with Trainers': 'Kids Bicycle',
                'Tire Inflator Air Pump': 'Car Tire',
                'Premium Basmati Rice 5kg': 'Basmati Rice',
                'Mixed Dry Fruits 1kg': 'Dry Fruits',
                'Pure Honey 500g': 'Honey jar',
                'Non-Stick Cookware Set': 'frying pan',
                'Floral Print Kurti': 'indian dress',
                'Cotton Pajama Set': 'pajamas'
            };
            if(fallbackMap[title]) {
                imageUrl = await fetchImage(fallbackMap[title]);
            }
        }

        if (imageUrl) {
            console.log(`Found: ${imageUrl}`);
            await Product.updateOne(
                { title: title },
                { $set: { image: imageUrl, images: [imageUrl, imageUrl] } }
            );

            // Update App.js (replacing placehold.co images)
            // First we need the encoded placehold.co url that is currently there
            const encodedTitle = encodeURIComponent(title.replace(/ /g, '\n'));
            const placeholder = `https://placehold.co/600x600/f8fafc/334155?text=${encodedTitle}`;
            
            // replace the exact placeholder URL with the real one in App.js
            code = code.split(placeholder).join(imageUrl);
        } else {
            console.log(`Still no image for ${title}`);
        }
    }
    
    fs.writeFileSync('c:/Users/Lenovo/Desktop/Sahara/Sahara/frontend/src/App.js', code);
    console.log('Database and App.js updated with real images!');
    mongoose.connection.close();
}

fixBrokenImages().catch(console.error);
