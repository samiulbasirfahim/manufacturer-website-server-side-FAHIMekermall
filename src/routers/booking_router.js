const express = require('express');
const mongoose = require('mongoose');
const verifyToken = require('../middleware/verifyToken');
const bookingSchema = require('../schemas/bookingSchema');
const router = express.Router()
const Booking = new mongoose.model("Booking", bookingSchema)




// pay booking
router.put('/pay/:id', verifyToken, async (req, res) => {
    console.log(req.body.transactionId)
    const exist = await Booking.findOne({ _id: req.params.id })
    exist.transactionId = req.body.transactionId;
    exist.paid = true;
    Booking.findOneAndUpdate({ _id: req.params.id }, { $set: exist }, { upsert: true }, (err, data) => {
        if (err) {
            res.status(500).send({ err: err, message: "there was a server side error" });
        } else {
            res.send({ success: true })
        }
    })
})


// get booking number
router.get('/count', async (req, res) => {
    console.log('object');
    Booking.find().count((err, count) => { res.send({ count }); });
})


// get one booking by id
router.get('/getOne/:id', verifyToken, async (req, res) => {
    Booking.findOne({ _id: req.params.id }, (err, booking) => {
        if (err) {
            res.status(500).send({ message: 'there was a server side error' });
        } else {
            res.send(booking)
        }
    })
})


// get all booking
router.get('/', verifyToken, async (req, res) => {
    let sort;
    if (req.query.sort) {
        switch (req.query.sort) {
            case "1":
                sort = { _id: -1 }
                break
            case "2":
                sort = { totalPrice: 1 }
                break
            case "3":
                sort = { quantity: -1 }
                break
        }
    }
    Booking.find({}, (err, data) => {
        if (err) {
            return res.status(500).send({ message: "there was an server side error", err })
        } else {
            res.send(data)
        }
    }).sort(sort);

})

// get my orders
router.get('/:userEmail', verifyToken, async (req, res) => {
    let sort;
    if (req.query.sort) {
        switch (req.query.sort) {
            case "1":
                sort = { _id: -1 }
                break
            case "2":
                sort = { totalPrice: 1 }
                break
            case "3":
                sort = { quantity: -1 }
                break
        }
    }
    Booking.find({ userEmail: req.params.userEmail }, (err, data) => {
        if (err) {
            return res.status(500).send({ message: "there was an server side error", error: err })
        } else {
            res.send(data)
        }
    }).sort(sort);

})


// add booking 
router.post('/', verifyToken, async (req, res) => {
    const newBooking = new Booking(req.body)
    console.log(newBooking)
    newBooking.save((err, data) => {
        if (err) {
            res.status(500).send({ message: "There was a server side error", err });
        } else {
            res.status(200).send({ data })
        }
    })
})


// remove booking 
router.delete('/:id', verifyToken, async (req, res, next) => {
    Booking.findOneAndRemove({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                res.status(400).send({ success: false });
            } else {
                res.status(200).send({ success: true });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ message: 'there was a server side error' });
        });
})







module.exports = router