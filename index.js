const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'knowledge_tuition',
    password: '786123',
    port: 5432,
});

// Test database connection immediately
pool.query('SELECT NOW()')
    .then(res => console.log('Database connected successfully:', res.rows[0]))
    .catch(err => console.error('Error connecting to database:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

// API endpoint for handling contact form submissions
app.post('/api/contact', async (req, res) => {
    const { name, email, standard, school, message } = req.body;

    console.log('Received contact form data:', req.body);

    if (!name || !email || !message) {
        console.warn('Missing required fields');
        return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO contacts (name, email, standard, school, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, standard, school, message]
        );

        console.log('Contact saved to database:', result.rows[0]);
        res.status(201).json({ message: 'Contact form submitted successfully!', data: result.rows[0] });
    } catch (err) {
        console.error('Error saving contact:', err);
        return res.status(500).json({ message: 'Database error: ' + err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});