const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    partId: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    TotalPrice: {
        type: Number,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
    },
    paid: {
        type: Boolean,
        required: true
    }

})

module.exports = bookingSchema