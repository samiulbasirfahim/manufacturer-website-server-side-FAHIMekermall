const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    authorImageUrl: {
        type: String,
        required: true
    },
    review: {
        type: String,
        min: 25,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
})

module.exports = reviewSchema