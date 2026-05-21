const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

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
});

const Product = mongoose.model('Product', productSchema);

const NEW_PRODUCTS = [
  // Men's Fashion
  { id: 1001, title: "Premium Leather Jacket", category: "mens-fashion", price: 4999, rating: 4.8, reviews: 210, brand: "RiderCo", stock: 50, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=500"] },
  { id: 1002, title: "Formal Oxford Shoes", category: "mens-fashion", price: 2999, rating: 4.5, reviews: 140, brand: "Clarks", stock: 80, image: "https://images.unsplash.com/photo-1614252339475-531eba835eb1?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1614252339475-531eba835eb1?auto=format&fit=crop&q=80&w=500"] },
  { id: 1003, title: "Classic Aviator Sunglasses", category: "mens-fashion", price: 1599, rating: 4.7, reviews: 320, brand: "RayBan", stock: 120, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500"] },
  
  // Women's Fashion
  { id: 1004, title: "Handcrafted Leather Tote", category: "womens-fashion", price: 3499, rating: 4.9, reviews: 280, brand: "Baggit", stock: 60, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=500"] },
  { id: 1005, title: "Elegant Evening Gown", category: "womens-fashion", price: 5999, rating: 4.6, reviews: 90, brand: "Zara", stock: 40, image: "https://images.unsplash.com/photo-1566160983994-399fb1fbb4fc?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1566160983994-399fb1fbb4fc?auto=format&fit=crop&q=80&w=500"] },
  { id: 1006, title: "Statement Gold Necklace", category: "womens-fashion", price: 1999, rating: 4.8, reviews: 150, brand: "Tanishq", stock: 100, image: "https://images.unsplash.com/photo-1599643478514-4a410f06424e?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1599643478514-4a410f06424e?auto=format&fit=crop&q=80&w=500"] },

  // Electronics
  { id: 1007, title: "4K Action Camera", category: "electronics", price: 12999, rating: 4.5, reviews: 400, brand: "GoPro", stock: 30, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=500"] },
  { id: 1008, title: "Mechanical Gaming Keyboard", category: "electronics", price: 4599, rating: 4.7, reviews: 310, brand: "Logitech", stock: 90, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=500"] },
  { id: 1009, title: "Smart Home Speaker", category: "electronics", price: 3999, rating: 4.4, reviews: 520, brand: "Amazon", stock: 150, image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80&w=500"] },

  // Home & Kitchen
  { id: 1010, title: "Ceramic Coffee Mug Set", category: "home-kitchen", price: 899, rating: 4.6, reviews: 180, brand: "HomeCenter", stock: 120, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=500"] },
  { id: 1011, title: "Stainless Steel Chef Knife", category: "home-kitchen", price: 1499, rating: 4.9, reviews: 260, brand: "Victorinox", stock: 70, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&q=80&w=500"] },
  { id: 1012, title: "Knitted Throw Blanket", category: "home-kitchen", price: 1299, rating: 4.7, reviews: 340, brand: "CozyHome", stock: 100, image: "https://images.unsplash.com/photo-1580828343064-fde4cad202d5?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1580828343064-fde4cad202d5?auto=format&fit=crop&q=80&w=500"] },

  // Beauty
  { id: 1013, title: "Vitamin C Facial Oil", category: "beauty", price: 1099, rating: 4.8, reviews: 410, brand: "Plum", stock: 150, image: "https://images.unsplash.com/photo-1608248593842-8d76d4ebbe74?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1608248593842-8d76d4ebbe74?auto=format&fit=crop&q=80&w=500"] },
  { id: 1014, title: "Eyeshadow Palette", category: "beauty", price: 2199, rating: 4.6, reviews: 290, brand: "MAC", stock: 80, image: "https://images.unsplash.com/photo-1512496015851-a1dc8a47cd45?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1512496015851-a1dc8a47cd45?auto=format&fit=crop&q=80&w=500"] },
  { id: 1015, title: "Rose Water Toner", category: "beauty", price: 499, rating: 4.7, reviews: 560, brand: "Kama Ayurveda", stock: 200, image: "https://images.unsplash.com/photo-1629198728070-7b61f9eb11c0?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1629198728070-7b61f9eb11c0?auto=format&fit=crop&q=80&w=500"] },

  // Sports
  { id: 1016, title: "Adjustable Kettlebell (10kg)", category: "sports", price: 2499, rating: 4.8, reviews: 180, brand: "CultFit", stock: 60, image: "https://images.unsplash.com/photo-1586401700636-4d081b8dc228?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1586401700636-4d081b8dc228?auto=format&fit=crop&q=80&w=500"] },
  { id: 1017, title: "Protein Shaker Bottle", category: "sports", price: 399, rating: 4.4, reviews: 350, brand: "MuscleBlaze", stock: 300, image: "https://images.unsplash.com/photo-1558197171-ec572de6f3d9?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1558197171-ec572de6f3d9?auto=format&fit=crop&q=80&w=500"] },
  { id: 1018, title: "Resistance Band Set", category: "sports", price: 899, rating: 4.6, reviews: 420, brand: "BoldFit", stock: 150, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&q=80&w=500"] },

  // Kids
  { id: 1019, title: "Wooden Building Blocks", category: "kids", price: 999, rating: 4.7, reviews: 220, brand: "Funskool", stock: 120, image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=500"] },
  { id: 1020, title: "Plush Teddy Bear", category: "kids", price: 699, rating: 4.9, reviews: 310, brand: "Hamleys", stock: 180, image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=500"] },
  { id: 1021, title: "Kids Water Bottle", category: "kids", price: 499, rating: 4.5, reviews: 450, brand: "Milton", stock: 250, image: "https://images.unsplash.com/photo-1556012018-50c5c0da73bf?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1556012018-50c5c0da73bf?auto=format&fit=crop&q=80&w=500"] },

  // Auto
  { id: 1022, title: "Leather Steering Wheel Cover", category: "auto", price: 899, rating: 4.4, reviews: 150, brand: "AutoFit", stock: 100, image: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&q=80&w=500"] },
  { id: 1023, title: "Microfiber Cleaning Cloths (Pack of 5)", category: "auto", price: 349, rating: 4.8, reviews: 620, brand: "CleanCar", stock: 300, image: "https://images.unsplash.com/photo-1580905151525-45d4c87c0dd5?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1580905151525-45d4c87c0dd5?auto=format&fit=crop&q=80&w=500"] },
  { id: 1024, title: "Premium Car Air Freshener", category: "auto", price: 299, rating: 4.6, reviews: 380, brand: "AmbiPur", stock: 200, image: "https://images.unsplash.com/photo-1588612502693-55734bd4851c?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1588612502693-55734bd4851c?auto=format&fit=crop&q=80&w=500"] },

  // Groceries
  { id: 1025, title: "Premium Roasted Coffee Beans (500g)", category: "groceries", price: 799, rating: 4.9, reviews: 520, brand: "BlueTokai", stock: 150, image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=500"] },
  { id: 1026, title: "Raw Organic Honey (1kg)", category: "groceries", price: 699, rating: 4.7, reviews: 410, brand: "Dabur", stock: 200, image: "https://images.unsplash.com/photo-1587049352847-4d4b126a51d3?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1587049352847-4d4b126a51d3?auto=format&fit=crop&q=80&w=500"] },
  { id: 1027, title: "Assorted Dark Chocolates", category: "groceries", price: 599, rating: 4.8, reviews: 330, brand: "Lindt", stock: 180, image: "https://images.unsplash.com/photo-1548883354-94cbdb7020eb?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1548883354-94cbdb7020eb?auto=format&fit=crop&q=80&w=500"] },

  // Books
  { id: 1028, title: "The Great Gatsby (Hardcover)", category: "books", price: 499, rating: 4.8, reviews: 950, brand: "Penguin", stock: 100, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=500"] },
  { id: 1029, title: "Minimalist Yearly Planner", category: "books", price: 899, rating: 4.6, reviews: 270, brand: "Moleskine", stock: 150, image: "https://images.unsplash.com/photo-1506784951206-33925eb6e159?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1506784951206-33925eb6e159?auto=format&fit=crop&q=80&w=500"] },
  { id: 1030, title: "Gourmet Recipe Cookbook", category: "books", price: 1299, rating: 4.7, reviews: 180, brand: "Phaidon", stock: 80, image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=500"] }
];

const addMoreProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sahara_ecommerce');
        console.log("Connected to MongoDB...");
        
        // Check if any of these products already exist to avoid duplicate insertion if script is run twice
        for (const prod of NEW_PRODUCTS) {
            const exists = await Product.findOne({ id: prod.id });
            if (!exists) {
                await Product.create(prod);
                console.log(`Inserted: ${prod.title}`);
            } else {
                console.log(`Already exists: ${prod.title}`);
            }
        }
        
        console.log("Finished adding 30 new products!");
        process.exit(0);
    } catch (err) {
        console.error("Error adding products:", err);
        process.exit(1);
    }
};

addMoreProducts();
