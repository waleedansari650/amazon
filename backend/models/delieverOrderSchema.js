const express = require('express');
const mongoose = require('mongoose');

const deliverOrdersSchema = new mongoose.Schema({
    orderId: {
        type: String,
    },
    name: {
        type: String,
    },

    address: {
        type: String,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    orders: Array,

    totalAmount: {
        type: Number,
    },
    orderPost: {
        type: String,
    }

}, { timestamps: true })
const DeliverOrders = mongoose.model("deliverOrders", deliverOrdersSchema);
module.exports = DeliverOrders;






