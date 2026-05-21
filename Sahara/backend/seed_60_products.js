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

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const NEW_PRODUCTS = [
  // MENS FASHION
  { title: "Classic White T-Shirt", category: "mens-fashion", price: 499, rating: 4.5, reviews: 120, brand: "ZARA", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80" },
  { title: "Slim Fit Denim Jeans", category: "mens-fashion", price: 1299, rating: 4.2, reviews: 85, brand: "Levi's", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80" },
  { title: "Leather Biker Jacket", category: "mens-fashion", price: 3499, rating: 4.8, reviews: 45, brand: "Diesel", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80" },
  { title: "Formal Oxford Shoes", category: "mens-fashion", price: 2199, rating: 4.6, reviews: 90, brand: "Clarks", image: "https://images.unsplash.com/photo-1614252339474-ce3a480a8ebf?w=500&q=80" },
  { title: "Casual Polo Shirt", category: "mens-fashion", price: 799, rating: 4.3, reviews: 110, brand: "Ralph Lauren", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80" },
  { title: "Winter Trench Coat", category: "mens-fashion", price: 4599, rating: 4.7, reviews: 30, brand: "Burberry", image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=500&q=80" },
  
  // WOMENS FASHION
  { title: "Floral Print Kurti", category: "womens-fashion", price: 799, rating: 4.6, reviews: 150, brand: "Biba", image: "https://images.unsplash.com/photo-1583391733958-d25e07fac66a?w=500&q=80" },
  { title: "Summer Midi Dress", category: "womens-fashion", price: 1499, rating: 4.8, reviews: 310, brand: "H&M", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80" },
  { title: "Designer Silk Saree", category: "womens-fashion", price: 5999, rating: 4.9, reviews: 80, brand: "FabIndia", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80" },
  { title: "High-Waist Skinny Jeans", category: "womens-fashion", price: 1199, rating: 4.4, reviews: 200, brand: "Zara", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80" },
  { title: "Elegant Evening Gown", category: "womens-fashion", price: 3999, rating: 4.7, reviews: 60, brand: "Vero Moda", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80" },
  { title: "Cotton Pajama Set", category: "womens-fashion", price: 699, rating: 4.5, reviews: 120, brand: "Marks & Spencer", image: "https://images.unsplash.com/photo-1603574670812-d245b08cb0da?w=500&q=80" },

  // ELECTRONICS
  { title: "Pro Wireless Earbuds", category: "electronics", price: 2999, rating: 4.4, reviews: 500, brand: "Apple", image: "https://images.unsplash.com/photo-1572569432719-0620f4b1e5a5?w=500&q=80" },
  { title: "UltraBook Pro Laptop", category: "electronics", price: 54999, rating: 4.9, reviews: 800, brand: "Dell", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80" },
  { title: "4K Action Camera", category: "electronics", price: 12999, rating: 4.7, reviews: 340, brand: "GoPro", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80" },
  { title: "Smart Home Speaker", category: "electronics", price: 3499, rating: 4.5, reviews: 600, brand: "Amazon", image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80" },
  { title: "Curved Gaming Monitor", category: "electronics", price: 18999, rating: 4.8, reviews: 220, brand: "Samsung", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80" },
  { title: "Noise Cancelling Headphones", category: "electronics", price: 14999, rating: 4.9, reviews: 900, brand: "Sony", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80" },
  { title: "Smartphone Pro Max", category: "electronics", price: 89999, rating: 4.8, reviews: 1200, brand: "Apple", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80" },
  { title: "Mechanical Keyboard", category: "electronics", price: 4599, rating: 4.7, reviews: 350, brand: "Logitech", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80" },

  // HOME & KITCHEN
  { title: "Minimalist Table Lamp", category: "home-kitchen", price: 1299, rating: 4.5, reviews: 45, brand: "Philips", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80" },
  { title: "Non-Stick Cookware Set", category: "home-kitchen", price: 2499, rating: 4.7, reviews: 320, brand: "Prestige", image: "https://images.unsplash.com/photo-1584990347449-a3910385cb68?w=500&q=80" },
  { title: "Ceramic Coffee Mug Set", category: "home-kitchen", price: 599, rating: 4.8, reviews: 150, brand: "Cello", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80" },
  { title: "Ergonomic Office Chair", category: "home-kitchen", price: 4999, rating: 4.4, reviews: 210, brand: "Green Soul", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80" },
  { title: "Robot Vacuum Cleaner", category: "home-kitchen", price: 15999, rating: 4.6, reviews: 180, brand: "iRobot", image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=500&q=80" },
  { title: "Cotton Bed Sheets", category: "home-kitchen", price: 899, rating: 4.5, reviews: 400, brand: "Bombay Dyeing", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&q=80" },

  // BEAUTY
  { title: "Hydrating Face Serum", category: "beauty", price: 899, rating: 4.8, reviews: 200, brand: "L'Oreal", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80" },
  { title: "Matte Lipstick Set", category: "beauty", price: 1299, rating: 4.6, reviews: 350, brand: "MAC", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80" },
  { title: "Organic Shampoo", category: "beauty", price: 599, rating: 4.3, reviews: 120, brand: "WOW", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&q=80" },
  { title: "Vitamin C Moisturizer", category: "beauty", price: 749, rating: 4.7, reviews: 280, brand: "Olay", image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=500&q=80" },
  { title: "Luxury Perfume", category: "beauty", price: 3599, rating: 4.9, reviews: 400, brand: "Chanel", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80" },
  { title: "Makeup Brush Kit", category: "beauty", price: 999, rating: 4.5, reviews: 150, brand: "Real Techniques", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80" },

  // SPORTS
  { title: "Yoga Mat with Strap", category: "sports", price: 699, rating: 4.5, reviews: 180, brand: "Puma", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80" },
  { title: "Adjustable Dumbbell Set", category: "sports", price: 2499, rating: 4.7, reviews: 420, brand: "Decathlon", image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=500&q=80" },
  { title: "Running Shoes", category: "sports", price: 2999, rating: 4.8, reviews: 600, brand: "Nike", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" },
  { title: "Resistance Bands", category: "sports", price: 399, rating: 4.4, reviews: 250, brand: "Boldfit", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&q=80" },
  { title: "Professional Football", category: "sports", price: 899, rating: 4.6, reviews: 130, brand: "Adidas", image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=500&q=80" },
  { title: "Tennis Racket", category: "sports", price: 3499, rating: 4.8, reviews: 90, brand: "Wilson", image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500&q=80" },

  // KIDS
  { title: "Educational Building Blocks", category: "kids", price: 899, rating: 4.8, reviews: 300, brand: "Lego", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&q=80" },
  { title: "Kids Remote Control Car", category: "kids", price: 1299, rating: 4.5, reviews: 150, brand: "Hot Wheels", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500&q=80" },
  { title: "Soft Plush Teddy Bear", category: "kids", price: 599, rating: 4.7, reviews: 220, brand: "Disney", image: "https://images.unsplash.com/photo-1559418306-027419e1e2d7?w=500&q=80" },
  { title: "Children's Storybook Set", category: "kids", price: 499, rating: 4.9, reviews: 450, brand: "Scholastic", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80" },
  { title: "Kids Bicycle with Trainers", category: "kids", price: 3499, rating: 4.6, reviews: 80, brand: "Hero", image: "https://images.unsplash.com/photo-1558281050-8b1b22e1f44a?w=500&q=80" },
  { title: "Art & Craft Kit", category: "kids", price: 399, rating: 4.5, reviews: 110, brand: "Crayola", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80" },

  // AUTO
  { title: "Car Vacuum Cleaner", category: "auto", price: 1499, rating: 4.4, reviews: 300, brand: "Bosch", image: "https://images.unsplash.com/photo-1563212001-c8167f80f1fc?w=500&q=80" },
  { title: "Premium Car Polish", category: "auto", price: 599, rating: 4.7, reviews: 120, brand: "3M", image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500&q=80" },
  { title: "Dashboard Camera", category: "auto", price: 2999, rating: 4.6, reviews: 250, brand: "Garmin", image: "https://images.unsplash.com/photo-1612808064409-f622949ff76f?w=500&q=80" },
  { title: "Car Air Purifier", category: "auto", price: 1999, rating: 4.5, reviews: 180, brand: "Philips", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?w=500&q=80" },
  { title: "Motorcycle Helmet", category: "auto", price: 2499, rating: 4.8, reviews: 400, brand: "Studds", image: "https://images.unsplash.com/photo-1556015048-4a41315610b3?w=500&q=80" },
  { title: "Tire Inflator Air Pump", category: "auto", price: 1299, rating: 4.4, reviews: 210, brand: "Michelin", image: "https://images.unsplash.com/photo-1634706915082-f54f762c90c7?w=500&q=80" },

  // GROCERIES
  { title: "Organic Green Tea", category: "groceries", price: 299, rating: 4.6, reviews: 500, brand: "Lipton", image: "https://images.unsplash.com/photo-1627490022131-01639c054199?w=500&q=80" },
  { title: "Premium Basmati Rice 5kg", category: "groceries", price: 699, rating: 4.8, reviews: 800, brand: "Daawat", image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=500&q=80" },
  { title: "Cold Pressed Olive Oil", category: "groceries", price: 899, rating: 4.7, reviews: 300, brand: "Figaro", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80" },
  { title: "Mixed Dry Fruits 1kg", category: "groceries", price: 1199, rating: 4.9, reviews: 450, brand: "Happilo", image: "https://images.unsplash.com/photo-1599580662283-042c12ba11a7?w=500&q=80" },
  { title: "Pure Honey 500g", category: "groceries", price: 349, rating: 4.8, reviews: 600, brand: "Dabur", image: "https://images.unsplash.com/photo-1587049352847-81a56d773c1c?w=500&q=80" },
  { title: "Whole Wheat Pasta", category: "groceries", price: 199, rating: 4.5, reviews: 200, brand: "Barilla", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&q=80" },

  // BOOKS
  { title: "The Psychology of Money", category: "books", price: 299, rating: 4.9, reviews: 1500, brand: "Morgan Housel", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80" },
  { title: "Atomic Habits", category: "books", price: 399, rating: 4.9, reviews: 2000, brand: "James Clear", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80" },
  { title: "Rich Dad Poor Dad", category: "books", price: 349, rating: 4.8, reviews: 1800, brand: "Robert Kiyosaki", image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&q=80" },
  { title: "Thinking, Fast and Slow", category: "books", price: 450, rating: 4.7, reviews: 1200, brand: "Daniel Kahneman", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80" },
  { title: "The Alchemist", category: "books", price: 250, rating: 4.8, reviews: 2500, brand: "Paulo Coelho", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80" },
  { title: "Sapiens: A Brief History", category: "books", price: 499, rating: 4.8, reviews: 1100, brand: "Yuval Noah Harari", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB.");

        console.log("Clearing existing products...");
        await Product.deleteMany({});
        
        console.log(`Inserting ${NEW_PRODUCTS.length} beautifully curated products...`);
        
        // Add random ID generator
        const productsToInsert = NEW_PRODUCTS.map(p => ({
          ...p,
          id: Math.floor(Math.random() * 1000000)
        }));

        await Product.insertMany(productsToInsert);
        console.log("Successfully seeded 60 products!");

        process.exit();
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
}

seed();
