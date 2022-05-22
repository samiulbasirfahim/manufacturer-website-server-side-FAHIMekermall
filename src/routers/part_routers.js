const express = require('express');
const mongoose = require('mongoose');
const partSchema = require('../schemas/partSchema');

const router = express.Router()

const Part = new mongoose.model("Part", partSchema)

router.get('/', async (req, res) => {
    Part.find({}, {
        limit: 10,
    }, (err, part) => {
        if (err) {
            res.status(500).send(err)
        }
        res.send(part)
    })
})

router.post('/', async (req, res) => {
    if (req.body._id === null) {
        delete req.body._id;
    }
    const newPart = new Part(req.body)
    newPart.save((err, part) => {
        console.log(err)
        res.send(part)  
    })
})


module.exports = router