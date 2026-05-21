const mongoose = require('mongoose');
const https = require('https');
require('dotenv').config();

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', () => {
      resolve(500);
    });
  });
}

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const Product = mongoose.connection.db.collection('products');
    const docs = await Product.find({}).toArray();
    console.log(`Checking ${docs.length} products...`);
    let broken = [];
    for(let d of docs) {
        if(d.image) {
            const status = await checkUrl(d.image);
            if(status >= 400) {
                broken.push(d.title);
            }
        }
    }
    console.log('Broken images for:', broken);
    process.exit();
}).catch(console.error);
