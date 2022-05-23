const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    Trice: {
        type: Number,
        required: true
    }
})

module.exports = bookingSchema