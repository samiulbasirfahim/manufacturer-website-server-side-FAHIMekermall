const express = require("express")
const mongoose = require("mongoose")
const userSchema = require("../schemas/userSchema")
const router = express.Router()

const Treatment = new mongoose.model("User", userSchema)

router.get("/", (req, res) => {
	res.send("hello world")
})

module.exports = router
