const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();


// PostgreSQL client setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'transaction_db',
    password: 'postgre',
    port: 5432,
});

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/transaction', async (req, res) => {
    const { amount, userFrom, userTo } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO "transactiondb" (amount, user_from, user_to) VALUES ($1, $2, $3) RETURNING *', [amount, userFrom, userTo]);
        const transaction = result.rows[0];
        client.release();
        res.json(transaction);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/transaction', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM "transactiondb"');
        const transactions = result.rows;
        client.release();
        res.json(transactions);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app;