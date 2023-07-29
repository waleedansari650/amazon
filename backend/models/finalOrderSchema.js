const express = require('express');
const mongoose = require('mongoose');

const finalOrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
    },
    email: {
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
        type: Date
    },
}, { timestamps: true })
const FinalOrder = mongoose.model("finalOrder", finalOrderSchema);
module.exports = FinalOrder;






