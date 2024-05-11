const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Dummy data
let shops = ["Maxima", "Lidl"];
let items = ["maisto produktai", "gyvūnų prekės"];

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop Management API',
      version: '1.0.0',
      description: 'API for managing shops and items',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['index.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes for shops
/**
 * @swagger
 * tags:
 *   name: Shops
 *   description: API endpoints for managing shops
 */

/**
 * @swagger
 * /api/shops:
 *   get:
 *     summary: Get all shops
 *     tags: [Shops]
 *     responses:
 *       200:
 *         description: List of shops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *     description: Get all shops
 */
app.get('/api/shops', (req, res) => {
    res.json(shops);
});

/**
 * @swagger
 * /api/shops:
 *   post:
 *     summary: Create a new shop
 *     tags: [Shops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created shop object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *     description: Create a new shop
 */
app.post('/api/shops', (req, res) => {
    const newShop = req.body;
    shops.push(newShop);
    res.status(201).json(newShop);
});

// Other shop routes...

// Routes for items
// Similar Swagger annotations for item routes...

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
