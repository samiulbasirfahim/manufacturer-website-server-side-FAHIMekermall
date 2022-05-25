const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    partTitle: {
        type: String,
        required: true
    },
    partId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        default: false,
    },
    transactionId: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['cycle', 'bike', 'automotive']
    }



})

module.exports = bookingSchema