const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const Product = mongoose.connection.db.collection('products');
    const docs = await Product.find({}).toArray();
    for(let d of docs) {
        await Product.updateOne({_id: d._id}, {$set: {images: [d.image, d.image]}});
    }
    console.log('Updated DB images array successfully');
    process.exit();
}).catch(console.error);
