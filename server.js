const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Hardcoded user data
const userData = {
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
};

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: 'Invalid data format' });
    }

    const numbers = data.filter(item => typeof item === 'number');
    const alphabets = data.filter(item => typeof item === 'string' && item.length === 1);
    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort()[alphabets.length - 1]] : [];

    const response = {
        is_success: true,
        ...userData,
        numbers,
        alphabets,
        highest_alphabet,
    };

    res.status(200).json(response);
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    // Return a hardcoded response for the GET request
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
