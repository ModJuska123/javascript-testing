// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sample data for demonstration (replace this with a database in a real application)
let shops = [];
let shopId = 1;

// Routes for managing shops

// Get all shops
app.get('/shops', (req, res) => {
    res.json(shops);
});

// Get a specific shop by ID
app.get('/shops/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const shop = shops.find(shop => shop.id === id);
    if (!shop) {
        res.status(404).json({ message: 'Shop not found' });
    } else {
        res.json(shop);
    }
});

// Create a new shop
app.post('/shops', (req, res) => {
    const { name, location } = req.body;
    const newShop = { id: shopId++, name, location, items: [] };
    shops.push(newShop);
    res.status(201).json(newShop);
});

// Update an existing shop
app.put('/shops/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, location } = req.body;
    const shopIndex = shops.findIndex(shop => shop.id === id);
    if (shopIndex === -1) {
        res.status(404).json({ message: 'Shop not found' });
    } else {
        shops[shopIndex].name = name;
        shops[shopIndex].location = location;
        res.json(shops[shopIndex]);
    }
});

// Delete a shop
app.delete('/shops/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const shopIndex = shops.findIndex(shop => shop.id === id);
    if (shopIndex === -1) {
        res.status(404).json({ message: 'Shop not found' });
    } else {
        shops.splice(shopIndex, 1);
        res.status(204).send();
    }
});

// Routes for managing shop items

// Get all items of a shop
app.get('/shops/:shopId/items', (req, res) => {
    const shopId = parseInt(req.params.shopId);
    const shop = shops.find(shop => shop.id === shopId);
    if (!shop) {
        res.status(404).json({ message: 'Shop not found' });
    } else {
        res.json(shop.items);
    }
});

// Add an item to a shop
app.post('/shops/:shopId/items', (req, res) => {
    const shopId = parseInt(req.params.shopId);
    const { name, price } = req.body;
    const shop = shops.find(shop => shop.id === shopId);
    if (!shop) {
        res.status(404).json({ message: 'Shop not found' });
    } else {
        const newItem = { name, price };
        shop.items.push(newItem);
        res.status(201).json(newItem);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
