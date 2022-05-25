const express = require('express');
const mongoose = require('mongoose');
const partSchema = require('../schemas/partSchema');
const router = express.Router()
const Part = new mongoose.model("Part", partSchema)
const bookingSchema = require('../schemas/bookingSchema');
const Booking = new mongoose.model("Booking", bookingSchema)

// add part api 
router.post('/', async (req, res) => {
    if (req.body._id === null) {
        delete req.body._id;
    }
    const newPart = new Part(req.body)
    newPart.save((err, part) => {
        if (err) {
            res.status(500).send({ message: "There was a server side error", err });
        } else {
            res.status(200).send({ part })
        }
    })
})
// get total number of parts
router.get('/count', async (req, res) => {
    let category;

    if (req.query.category) {
        switch (req.query.category) {
            case "all":
                category = {}
                break
            case "bike":
                category = { category: 'bike' }
                break
            case "cycle":
                category = { category: 'cycle' }
                break
            case "car":
                category = { category: 'car' }
                break
            default:
                category = {}
                break

        }
    }
    Part.find(category).count((err, count) => { res.send({ count }); });
})


// get one part api 
router.get('/:id', async (req, res) => {
    const query = { _id: req.params.id }
    console.log(query)
    const part = await Part.findOne(query)
    const booked = await Booking.find({ partId: req.params.id })
    const bookedQuantityArray = booked.map((book) => book.quantity)
    const bookedQuantity = bookedQuantityArray.reduce((partialSum, a) => partialSum + a, 0);
    part.availableQuantity = part.availableQuantity - bookedQuantity
    res.send(part)
})

// get all part api 
router.get('/', async (req, res) => {
    const options = {}
    if (req.query.limit) {
        console.log(req.query.limit)
        options.limit = +req.query.limit
    }
    let skip;
    if (req.query.skip) {
        skip = req.query.skip
    }
    let sort;
    if (req.query.sort) {
        switch (req.query.sort) {
            case "1":
                sort = { _id: -1 }
                break
            case "2":
                sort = { price: 1 }
                break
            case "0":
                sort = undefined
                break
        }
    }

    let category;

    if (req.query.category) {
        switch (req.query.category) {
            case "all":
                category = {}
                break
            case "bike":
                category = { category: 'bike' }
                break
            case "cycle":
                category = { category: 'cycle' }
                break
            case "car":
                category = { category: 'car' }
                break
            default:
                category = {}
                break

        }
    }
    const booked = await Booking.find({})
    const parts = await Part.find(category).limit(req.query.limit).sort(sort).skip(skip)
    await parts.forEach(async part => {
        const bookedForThisPart = await booked.filter(book => book.partId === part._id + "")
        const bookedQuantityArray = bookedForThisPart.map(book => book.quantity)
        const bookedQuantity = bookedQuantityArray.reduce((partialSum, a) => partialSum + a, 0);
        part.availableQuantity = part.availableQuantity - bookedQuantity
    })
    res.send(parts)

})


module.exports = router