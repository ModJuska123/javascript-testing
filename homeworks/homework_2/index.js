const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Sample data for shops and items
let shops = [];
let items = [];
let shopIdCounter = 1;
let itemIdCounter = 1;

app.use(bodyParser.json());

// Endpoint to create a new shop
app.post('/shops', (req, res) => {
    const { name, location } = req.body;
    const newShop = {
        id: shopIdCounter++,
        name,
        location
    };
    shops.push(newShop);
    res.status(201).json(newShop);
});

// Endpoint to get all shops
app.get('/shops', (req, res) => {
    res.json(shops);
});

// Endpoint to create a new item
app.post('/items', (req, res) => {
    const { name, price } = req.body;
    const newItem = {
        id: itemIdCounter++,
        name,
        price
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Endpoint to get all items
app.get('/items', (req, res) => {
    res.json(items);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
