const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

// --- Connection Details ---
// Make sure you have MongoDB running on your machine.
// The default connection URL is shown below.
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'snapShopDb';
let db;

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (so your front-end can talk to this server)
app.use(cors());
// Enable Express to parse JSON in request bodies
app.use(express.json());

// --- Connect to MongoDB ---
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected successfully to MongoDB');
        db = client.db(dbName);
    })
    .catch(error => console.error('Failed to connect to MongoDB:', error));

// --- API Routes (Endpoints) ---

// A. GET ALL PRODUCTS
// This endpoint sends the list of all products to the user's shop page.
app.get('/api/products', async (req, res) => {
    if (!db) {
        return res.status(500).json({ message: 'Database not connected' });
    }
    try {
        const products = await db.collection('products').find({}).toArray();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// B. ADD A NEW PRODUCT
// This endpoint receives product data from the admin panel and saves it to the database.
app.post('/api/products', async (req, res) => {
    if (!db) {
        return res.status(500).json({ message: 'Database not connected' });
    }
    const newProduct = {
        name: req.body.name,
        price: parseFloat(req.body.price),
        image: req.body.image,
        category: req.body.category,
        createdAt: new Date()
    };
    try {
        const result = await db.collection('products').insertOne(newProduct);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});

// C. SELLER VERIFICATION (A Simple Example)
// In a real app, this would check a username/password against a database of sellers.
// For now, it uses a simple, hard-coded credential.
app.post('/api/seller-verify', (req, res) => {
    const { email, password } = req.body;
    
    // IMPORTANT: These should be stored securely in a database, not here.
    const SELLER_EMAIL = "admin@snapshop.com";
    const SELLER_PASSWORD = "password123";

    if (email === SELLER_EMAIL && password === SELLER_PASSWORD) {
        res.status(200).json({ success: true, message: 'Verification successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Snap Shop server listening at http://localhost:${port}`);
});
