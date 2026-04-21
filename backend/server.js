const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Item = require('./models/Item');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error Details:");
    console.error(err.message);
  });

// Add this to catch errors that happen AFTER the initial connection
mongoose.connection.on('error', err => {
  console.error("🔥 Post-connection error:", err);
});

// --- ROUTES (The API Endpoints) ---

// 1. GET all items
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// 2. POST a new item
app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));