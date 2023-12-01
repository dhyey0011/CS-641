const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Connect to MongoDB
connectDB();

// Create a MongoDB model
const Item = require('./models/Item');

// Middleware for parsing JSON
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Endpoint to save an item to the database
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item({ text: req.body.text });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    console.error('Error saving item:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint to retrieve all items from the database
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error getting items:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
