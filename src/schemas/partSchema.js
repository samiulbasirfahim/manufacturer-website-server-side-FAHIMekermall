const mongoose = require('mongoose')

const partSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        min: 50,
        required: true
    },
    minOrderQuantity: {
        type: Number,
        required: true,
        min: 1
    },
    availableQuantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = partSchema