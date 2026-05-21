/**
 * fix_images.js
 * - Removes duplicate products (keeps one per numeric `id`)
 * - Replaces all iStockPhoto image URLs with working Unsplash URLs
 */
const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  price: Number,
  rating: Number,
  reviews: Number,
  image: String,
  images: [String],
  brand: String,
  stock: { type: Number, default: 100 }
}, { strict: false });

const Product = mongoose.model('Product', productSchema);

// Map of numeric product id → clean Unsplash images array
const CLEAN_IMAGES = {
  15:  ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=1080',
        'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=1080'],
  17:  ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=1080',
        'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1080'],
  201: ['https://images.unsplash.com/photo-1503376712353-33e1444dfbc5?auto=format&fit=crop&q=80&w=1080',
        'https://images.unsplash.com/photo-1627843477146-51e60ad3c3e8?auto=format&fit=crop&q=80&w=1080'],
  202: ['https://images.unsplash.com/photo-1673674716590-26983f64b76a?auto=format&fit=crop&q=80&w=1080',
        'https://images.unsplash.com/photo-1673089858109-4e0e25ce4d4f?auto=format&fit=crop&q=80&w=1080'],
  301: ['https://images.unsplash.com/photo-1615485737627-627006ab6920?auto=format&fit=crop&q=80&w=1080',
        'https://images.unsplash.com/photo-1508061253366-f7da158b6d9b?auto=format&fit=crop&q=80&w=1080'],
  302: ['https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=1080',
        'https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?auto=format&fit=crop&q=80&w=1080'],
  401: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1080',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1080'],
  402: ['https://images.unsplash.com/photo-1611571741792-edb58d0ceb67?auto=format&fit=crop&q=80&w=1080',
        'https://images.unsplash.com/photo-1636014701699-f086cd23fab6?auto=format&fit=crop&q=80&w=1080'],
};

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const all = await Product.find({});
  console.log(`📦 Total products in DB: ${all.length}`);

  // --- Step 1: Remove duplicates (keep first occurrence per numeric id) ---
  const seen = new Map();
  const toDelete = [];

  for (const p of all) {
    const key = p.id;
    if (key === undefined || key === null) continue;
    if (seen.has(key)) {
      toDelete.push(p._id);
    } else {
      seen.set(key, p._id);
    }
  }

  if (toDelete.length > 0) {
    await Product.deleteMany({ _id: { $in: toDelete } });
    console.log(`🗑️  Removed ${toDelete.length} duplicate product(s)`);
  } else {
    console.log('✅ No duplicates found');
  }

  // --- Step 2: Fix all iStockPhoto URLs ---
  const remaining = await Product.find({});
  let fixedCount = 0;

  for (const p of remaining) {
    const hasIstock = (arr) => Array.isArray(arr) && arr.some(u => u && u.includes('istock'));

    const needsFix = (p.image && p.image.includes('istock')) || hasIstock(p.images);
    if (!needsFix && !CLEAN_IMAGES[p.id]) continue;

    const cleanImgs = CLEAN_IMAGES[p.id];
    if (!cleanImgs) {
      // Just strip istock URLs from images array
      const filtered = (p.images || []).filter(u => !u.includes('istock'));
      await Product.updateOne({ _id: p._id }, { $set: { images: filtered } });
      console.log(`🔧 Stripped iStock from: ${p.title}`);
      fixedCount++;
      continue;
    }

    const update = { images: cleanImgs };
    // Also fix the primary image field if it's istock
    if (p.image && p.image.includes('istock')) {
      update.image = cleanImgs[0];
    }

    await Product.updateOne({ _id: p._id }, { $set: update });
    console.log(`🖼️  Fixed images for: ${p.title} (id=${p.id})`);
    fixedCount++;
  }

  console.log(`\n✅ Fixed ${fixedCount} product image(s)`);
  console.log(`📦 Final product count: ${await Product.countDocuments()}`);
  await mongoose.disconnect();
  console.log('🔌 Disconnected');
};

run().catch(err => { console.error('❌ Error:', err); process.exit(1); });
