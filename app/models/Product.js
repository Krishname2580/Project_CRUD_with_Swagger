const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    size: String,
    color: String,
    category: String,
    imageUrl: String,
    imageId: String
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);