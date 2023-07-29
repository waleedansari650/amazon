const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    image: {
        type: String
    },
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    longDescription: {
        type: String,
    },

    cart: Array,


}, { timestamps: true })
const Products = new mongoose.model("products", productsSchema);
module.exports = Products;

