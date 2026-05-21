const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Define Product Schema (Must match server.js)
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

// --- DATA TO INSERT ---
const INITIAL_PRODUCTS = [
  // Men's Fashion
  { id: 1, title: "Classic Cotton T-Shirt", category: "mens-fashion", price: 499, rating: 4.5, reviews: 120, brand: "UrbanOne", stock: 100, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500"] },
  { id: 2, title: "Slim Fit Denim Jeans", category: "mens-fashion", price: 1299, rating: 4.2, reviews: 85, brand: "DenimCo", stock: 100, image: "https://images.unsplash.com/photo-1542272617-08f086303294?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1542272617-08f086303294?auto=format&fit=crop&q=80&w=500"] },
  // Women's Fashion
  { id: 4, title: "Floral Print Kurti", category: "womens-fashion", price: 799, rating: 4.6, reviews: 150, brand: "EthnicVibe", stock: 100, image: "https://images.unsplash.com/photo-1583391733958-d024429fbed3?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1583391733958-d024429fbed3?auto=format&fit=crop&q=80&w=500"] },
  { id: 5, title: "Summer Midi Dress", category: "womens-fashion", price: 1499, rating: 4.8, reviews: 310, brand: "ChicStyle", stock: 100, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=500"] },
  // Electronics
  { id: 6, title: "Pro Wireless Earbuds", category: "electronics", price: 2999, rating: 4.4, reviews: 500, brand: "SoundMax", stock: 100, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=500"] },
  { id: 7, title: "UltraBook Pro Laptop", category: "electronics", price: 54999, rating: 4.9, reviews: 80, brand: "TechCore", stock: 100, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=500"] },
  // Home
  { id: 9, title: "Minimalist Table Lamp", category: "home-kitchen", price: 1299, rating: 4.5, reviews: 45, brand: "Lumina", stock: 100, image: "https://images.unsplash.com/photo-1507473888900-52e1adad54cd?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1507473888900-52e1adad54cd?auto=format&fit=crop&q=80&w=500"] },
  // Beauty
  { id: 11, title: "Hydrating Face Serum", category: "beauty", price: 899, rating: 4.8, reviews: 200, brand: "GlowSkin", stock: 100, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=500"] },
  { id: 12, title: "Matte Lipstick Set", category: "beauty", price: 1299, rating: 4.6, reviews: 350, brand: "ColorPop", stock: 100, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=500"] },
  { id: 13, title: "Organic Shampoo", category: "beauty", price: 599, rating: 4.3, reviews: 120, brand: "NatureCare", stock: 100, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=500"] },
  { id: 14, title: "Luxury Perfume", category: "beauty", price: 3499, rating: 4.9, reviews: 89, brand: "ScentX", stock: 100, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=500"] },
  // Sports
  { id: 15, title: "Pro Yoga Mat", category: "sports", price: 799, rating: 4.7, reviews: 400, brand: "FlexFit", stock: 100, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=500"] },
  { id: 16, title: "Running Shoes", category: "sports", price: 2499, rating: 4.5, reviews: 150, brand: "SpeedRun", stock: 100, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500"] },
  { id: 17, title: "Dumbbell Set (5kg)", category: "sports", price: 1899, rating: 4.6, reviews: 80, brand: "IronGym", stock: 100, image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=500"] },
  { id: 18, title: "Football Size 5", category: "sports", price: 999, rating: 4.4, reviews: 210, brand: "KickOff", stock: 100, image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80&w=500"] },
  // New Categories
  { id: 101, title: "RC Stunt Car Toy", category: "kids", price: 1299, rating: 4.6, reviews: 85, brand: "ToyZone", stock: 50, image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=500"] },
  { id: 102, title: "School Bag (Marvel)", category: "kids", price: 899, rating: 4.8, reviews: 150, brand: "SkyBags", stock: 100, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500"] },
  { id: 201, title: "Portable Car Vacuum", category: "auto", price: 1999, rating: 4.3, reviews: 60, brand: "AutoClean", stock: 30, image: "https://images.unsplash.com/photo-1552975086-2b93242b1b96?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1552975086-2b93242b1b96?auto=format&fit=crop&q=80&w=500"] },
  { id: 202, title: "Biker Helmet Pro", category: "auto", price: 2499, rating: 4.9, reviews: 210, brand: "Steelbird", stock: 45, image: "https://images.unsplash.com/photo-1558636815-1ba25e557956?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1558636815-1ba25e557956?auto=format&fit=crop&q=80&w=500"] },
  { id: 301, title: "Premium Almonds", category: "groceries", price: 650, rating: 4.7, reviews: 400, brand: "NutriLife", stock: 200, image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d9b?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1508061253366-f7da158b6d9b?auto=format&fit=crop&q=80&w=500"] },
  { id: 302, title: "Organic Green Tea", category: "groceries", price: 450, rating: 4.5, reviews: 120, brand: "EcoSip", stock: 150, image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=500"] },
  { id: 401, title: "The Great Gatsby", category: "books", price: 299, rating: 4.8, reviews: 1000, brand: "Penguin", stock: 80, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=500"] },
  { id: 402, title: "Notebook Set (A5)", category: "books", price: 399, rating: 4.6, reviews: 90, brand: "PaperKraft", stock: 120, image: "https://images.unsplash.com/photo-1531346878377-a51e1959de20?auto=format&fit=crop&q=80&w=500", images: ["https://images.unsplash.com/photo-1531346878377-a51e1959de20?auto=format&fit=crop&q=80&w=500"] },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for Seeding...");
        
        await Product.deleteMany({});
        await Product.insertMany(INITIAL_PRODUCTS);
        
        console.log("Database Seeded Successfully!");
        process.exit();
    } catch (err) {
        console.error("Error seeding database:", err);
        process.exit(1);
    }
};

seedDB();