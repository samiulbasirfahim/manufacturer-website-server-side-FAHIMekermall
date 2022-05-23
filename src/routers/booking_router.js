const express = require('express');
const mongoose = require('mongoose');
const bookingSchema = require('../schemas/bookingSchema');
const router = express.Router()
const Booking = new mongoose.model("Booking", bookingSchema)

// get all booking
router.get('/', async (req, res) => {
    let sort;
    if (req.query.sort) {
        switch (req.query.sort) {
            case "1":
                sort = { _id: -1 }
                break
            case "2":
                sort = { price: 1 }
                break
            case "3":
                sort = { quantity: -1 }
                break
        }
    }
    Booking.find({}, (err, data) => {
        if (err) {
            return res.status(500).send({ message: "there was an server side error" })
        } else {
            res.send(data)
        }
    }).sort(sort);

})

module.exports = router