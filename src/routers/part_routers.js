const express = require('express');
const mongoose = require('mongoose');
const partSchema = require('../schemas/partSchema');

const router = express.Router()

const Part = new mongoose.model("Part", partSchema)

router.post('/', async (req, res) => {
    if (req.body._id === null) {
        delete req.body._id;
    }
    const newPart = new Part(req.body)
    newPart.save((err, part) => {
        if (err) {
            res.status(500).send({ message: "There was a server side error", err });
        } else {
            res.status(200).send({ message: "data saved successfully", part })
        }
    })
})


module.exports = router