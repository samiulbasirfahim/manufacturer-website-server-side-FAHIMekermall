const express = require('express');
const mongoose = require('mongoose');
const partSchema = require('../schemas/partSchema');
const router = express.Router()
const Part = new mongoose.model("Part", partSchema)

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
    Part.find({}, "", options, (err, data) => {
        if (err) {
            return res.status(500).send({ message: "there was an server side error" })
        } else {
            res.send(data)
        }
    }).skip(skip).sort(sort);

})


module.exports = router