const express = require('express');
const mongoose = require('mongoose');
const partSchema = require('../schemas/partSchema');

const router = express.Router()

const Part = new mongoose.model("Part", partSchema)

router.get('/', async (req, res) => {
    if (req.query.limit) {
        Part.find({}.limit(req.query.limit), (err, part) => {
            if (err) {
                res.status(500).send(err)
            }
            res.send(part)
        })
    }
})
