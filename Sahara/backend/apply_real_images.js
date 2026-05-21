const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const imageMap = {
  'Formal Oxford Shoes': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
  'Floral Print Kurti': 'https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?w=600&q=80',
  'Cotton Pajama Set': 'https://images.unsplash.com/photo-1585218356057-dc0e8d35583b?w=600&q=80',
  'Pro Wireless Earbuds': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
  'Non-Stick Cookware Set': 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=600&q=80',
  'Soft Plush Teddy Bear': 'https://images.unsplash.com/photo-1560809451-9e77c13a0595?w=600&q=80',
  'Kids Bicycle with Trainers': 'https://images.unsplash.com/photo-1471506415426-0ca457486bb0?w=600&q=80',
  'Car Vacuum Cleaner': 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=600&q=80',
  'Dashboard Camera': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80',
  'Car Air Purifier': 'https://images.unsplash.com/photo-1581452906109-b6951b14a09c?w=600&q=80',
  'Motorcycle Helmet': 'https://images.unsplash.com/photo-1558636815-1ba25e557956?w=600&q=80',
  'Tire Inflator Air Pump': 'https://images.unsplash.com/photo-1632734125348-e8ddcde68181?w=600&q=80',
  'Organic Green Tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
  'Premium Basmati Rice 5kg': 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&q=80',
  'Mixed Dry Fruits 1kg': 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&q=80',
  'Pure Honey 500g': 'https://images.unsplash.com/photo-1587049352851-8d4e8e1330bd?w=600&q=80'
};

function getPlaceholder(title) {
  const encoded = encodeURIComponent(title.replace(/ /g, '\n'));
  return `https://placehold.co/600x600/f8fafc/334155?text=${encoded}`;
}

async function fixBrokenImages() {
    await mongoose.connect(process.env.MONGO_URI);
    const Product = mongoose.connection.db.collection('products');
    let code = fs.readFileSync('c:/Users/Lenovo/Desktop/Sahara/Sahara/frontend/src/App.js', 'utf8');

    for (const [title, realImage] of Object.entries(imageMap)) {
        await Product.updateOne(
            { title: title },
            { $set: { image: realImage, images: [realImage, realImage] } }
        );

        const placeholder = getPlaceholder(title);
        // We used exact replacement string previously, so split/join will work to revert placeholder to realImage
        code = code.split(placeholder).join(realImage);
    }
    
    fs.writeFileSync('c:/Users/Lenovo/Desktop/Sahara/Sahara/frontend/src/App.js', code);
    console.log('Database and App.js updated with REAL beautiful images!');
    mongoose.connection.close();
}

fixBrokenImages().catch(console.error);
