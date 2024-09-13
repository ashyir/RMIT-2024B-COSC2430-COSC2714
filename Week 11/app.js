const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection URI
const uri = '';
const client = new MongoClient(uri);

// Database and collection
const dbName = 'shop';
const collectionName = 'products';

// Connect to MongoDB
let db, collection;

client.connect()
    .then(() => {
        console.log('MongoDB Connected.');
        db = client.db(dbName);
        collection = db.collection(collectionName);
    })
    .catch(err => console.error(err));

// Routes

// 1. Create a new product (POST /products)
app.post('/products', async (req, res) => {
    try {
        const { name, price } = req.body;
        const result = await collection.insertOne({ name, price });

        res.status(201).json({ _id: result.insertedId, name, price });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get all products (GET /products)
app.get('/products', async (req, res) => {
    try {
        const products = await collection.find().toArray();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Get a product by ID (GET /products/:id)
app.get('/products/:id', async (req, res) => {
    try {
        const product = await collection.findOne({ _id: new ObjectId(req.params.id) });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update a product (PUT /products/:id)
app.put('/products/:id', async (req, res) => {
    try {
        const { name, price } = req.body;

        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: { name, price } },
            { returnOriginal: false }
        );

        if (!result) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Delete a product (DELETE /products/:id)
app.delete('/products/:id', async (req, res) => {
    try {
        const result = await collection.findOneAndDelete({ _id: new ObjectId(req.params.id) });

        if (!result) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});