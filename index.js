// bubble-api-integration/index.js

require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const BUBBLE_API_URL = process.env.BUBBLE_API_URL;
const BUBBLE_API_KEY = process.env.BUBBLE_API_KEY;
const DATA_TYPE = process.env.DATA_TYPE; // Bubble database table name

app.use(express.json());

// Fetch all records
app.get('/records', async (req, res) => {
    try {
        const response = await axios.get(`${BUBBLE_API_URL}/${DATA_TYPE}`, {
            headers: { 'Authorization': `Bearer ${BUBBLE_API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new record
app.post('/records', async (req, res) => {
    try {
        const response = await axios.post(`${BUBBLE_API_URL}/${DATA_TYPE}`, req.body, {
            headers: { 'Authorization': `Bearer ${BUBBLE_API_KEY}`, 'Content-Type': 'application/json' }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a record
app.put('/records/:id', async (req, res) => {
    try {
        const response = await axios.patch(`${BUBBLE_API_URL}/${DATA_TYPE}/${req.params.id}`, req.body, {
            headers: { 'Authorization': `Bearer ${BUBBLE_API_KEY}`, 'Content-Type': 'application/json' }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a record
app.delete('/records/:id', async (req, res) => {
    try {
        await axios.delete(`${BUBBLE_API_URL}/${DATA_TYPE}/${req.params.id}`, {
            headers: { 'Authorization': `Bearer ${BUBBLE_API_KEY}` }
        });
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Instructions:
// 1. Create a `.env` file and add:
//    BUBBLE_API_URL='https://yourapp.bubbleapps.io/api/1.1/obj'
//    BUBBLE_API_KEY='your_api_key'
//    DATA_TYPE='your_data_type'
// 2. Install dependencies: `npm install express axios dotenv`
// 3. Run the server: `node index.js`
