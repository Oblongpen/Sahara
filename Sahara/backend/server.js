const dotenv = require('dotenv');
dotenv.config(); // This must be the very first line
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // <--- Now this will work
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const { sendVerificationEmail, sendOrderConfirmationEmail } = require('./email'); // Import the email function
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'a-very-secret-key', // It's best to set this in your .env file
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 600000 } // 10 minutes; set secure: true in production with HTTPS
}));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Serve Static Files (so frontend can display uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- MULTER CONFIGURATION (For Image Uploads) ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Images will be stored in backend/uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Unique filename
    }
});
const upload = multer({ storage: storage });

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log("MongoDB Connection Error:", err));

// --- SCHEMAS & MODELS ---

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String },
    role: { type: String, default: 'user' },
    location: { type: String, default: 'India' },
    profileImage: { type: String } // New field for image path
});
const User = mongoose.model('User', userSchema);

// Product Schema
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

// Order Schema
const orderSchema = new mongoose.Schema({
    userId: String,
    name: String,
    email: String,
    mobile: String,
    street: String,
    landmark: String,
    city: String,
    pincode: String,
    items: Array,
    total: Number,
    status: { type: String, default: 'Pending' },
    date: { type: String, default: () => new Date().toLocaleDateString() }
});
const Order = mongoose.model('Order', orderSchema);

// --- ROUTES ---

app.get('/', (req, res) => {
    res.send('Sahara API is running..');
});

// 1. Auth Routes
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Admin Check
    if (email === 'Admin@Sahara2025gmail.com' && password === 'Sahara@2025') {
        const adminUser = await User.findOne({ email });
        return res.json({
            name: 'Sahara Admin',
            email: 'Admin@Sahara2025gmail.com',
            role: 'admin',
            mobile: '9999999999',
            location: 'Headquarters, India',
            profileImage: adminUser ? adminUser.profileImage : null
        });
    }

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.json(user);
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.json({ success: false, message: "User already exists" });

        const newUser = new User({ name, email, password, mobile });
        await newUser.save();
        res.json({ success: true, message: "Registration Successful", user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/send-otp', async (req, res) => {
    const { email } = req.body; // Expect email for OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

    try {
        await sendVerificationEmail(email, otp);
        // Securely store the OTP and its expiration in the user's session
        req.session.otp = otp;
        req.session.otpExpires = Date.now() + 600000; // 10 minutes
        res.json({ message: "An OTP has been sent to your email." });
    } catch (error) {
        console.error("Error sending OTP:", error);
        // Provide a more specific error message for easier debugging
        res.status(500).json({ message: `Failed to send OTP. Server Error: ${error.message}` });
    }
});

app.post('/api/verify-otp', async (req, res) => {
    const { otp, orderDetails } = req.body;

    // By user request, OTP validation is bypassed to allow any random dummy OTP to succeed during testing
    const isMasterOtp = true;

    if (!isMasterOtp) {
        // Verify Regular OTP
        if (!req.session.otp || !req.session.otpExpires) {
            return res.status(400).json({ message: "OTP not found or session expired. Please try again. Or use dummy OTP 123456." });
        }
        if (Date.now() > req.session.otpExpires) {
            req.session.otp = null; // Clear expired OTP
            req.session.otpExpires = null;
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }
        if (req.session.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP. Please try again. Or use dummy OTP 123456." });
        }
    }

    // Clear OTP from session after successful verification
    req.session.otp = null;
    req.session.otpExpires = null;

    // Proceed with creating the order (this part is moved from the frontend)
    try {
        const newOrder = new Order(orderDetails);
        await newOrder.save();
        await sendOrderConfirmationEmail(newOrder); // Send confirmation email
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("Error creating order after OTP verification:", error);
        res.status(500).json({ message: "Failed to create order." });
    }
});


// 2. Product Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const { title, category, price, brand, stock, description, image } = req.body;

        // Accept either an uploaded file or an image URL string
        let imageUrl = image;

        if (req.file) {
            imageUrl = req.file.path.replace(/\\/g, "/"); // Store the path to the image
        }

        if (!imageUrl) {
            return res.status(400).json({ message: 'Product image URL or file is required.' });
        }

        const newProduct = new Product({
            title,
            category,
            price,
            brand,
            stock,
            description,
            image: imageUrl
        });

        await newProduct.save();
        res.status(201).json({ message: "Product Added Successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Product Updated Successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/seed-products', async (req, res) => {
    try {
        const count = await Product.countDocuments();
        if (count > 0) {
            return res.json({ message: "Products already seeded" });
        }
        const { products } = req.body;
        await Product.insertMany(products);
        res.json({ message: "Products Seeded Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 3. Order Routes
app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        await sendOrderConfirmationEmail(newOrder); // Send email
        res.json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order" });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ _id: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});

app.put('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error updating order" });
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order" });
    }
});

// 4. User Routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// 5. Profile Update Route (With Image Upload)
app.put('/api/profile', upload.single('profileImage'), async (req, res) => {
    try {
        const { name, email, mobile, location } = req.body;
        const updateData = { name, mobile, location };

        if (req.file) {
            // Save the path to the uploaded image
            updateData.profileImage = req.file.path.replace(/\\/g, "/"); // Normalize path for Windows
        }

        // Upsert: Update if exists, create if not (for Admin profile storage)
        const user = await User.findOneAndUpdate(
            { email: email },
            updateData,
            { new: true, upsert: true }
        );

        res.json({ message: "Profile Updated", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating profile" });
    }
});

app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl: imageUrl });
});

// Catch-all 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));