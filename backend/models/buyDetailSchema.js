const express = require('express');
const mongoose = require('mongoose');

const buySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    houseNo: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true
    },

}, { timestamps: true })
const BuyDetail = mongoose.model("buydetail", buySchema);
module.exports = BuyDetail;


