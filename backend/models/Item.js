const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // Extra field for bonus marks
    quantity: { type: Number, default: 1 }      // Extra field for bonus marks
});

module.exports = mongoose.model('Item', ItemSchema);