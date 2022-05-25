const express = require('express');
const mongoose = require('mongoose');
const verifyToken = require('../middleware/verifyToken');
const reviewSchema = require('../schemas/reviewSchema');
const router = express.Router()
const Review = new mongoose.model("Review", reviewSchema)


router.post('/', verifyToken, async (req, res) => {
    const newReview = new Review(req.body)
    newReview.save((err, part) => {
        if (err) {
            res.status(500).send({ message: "There was a server side error", err });
        } else {
            res.status(200).send({ part })
        }
    })
})

router.get('/', async (req, res) => {
    Review.find({}, "", { limit: 10, sort: { _id: -1 } }, (err, review) => {
        res.status(200).send(review)
    })
})


router.get('/count', async (req, res) => {
    Review.find().count((err, count) => { res.send({ count }); });
})


module.exports = router