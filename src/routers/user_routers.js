// import
const express = require("express")
const mongoose = require("mongoose")
const verifyToken = require("../middleware/verifyToken")
const userSchema = require("../schemas/userSchema")
const jwt = require("jsonwebtoken")
const router = express.Router()

const User = new mongoose.model("User", userSchema)


// get all users
router.get("/", verifyToken, (req, res) => {
	res.send("hello world")
})


// add user and issue token
router.put("/:email", async (req, res) => {
	const { email } = req.params
	const userInfo = req.body.userInfo
	if (!userInfo) {
		return res.status(500).send({ message: "User info not found" })
	}
	if (userInfo.roles) {
		return res.status(403).send({ message: "You cant make you admin when you create a account" })
	}
	User.findOneAndUpdate(
		{ email: email },
		{ $set: userInfo },
		{ upsert: true, new: true },
		(err) => {
			if (isNaN(err?.result?.lastErrorObject?.updatedExisting)) {
				return res.status(500).send('something wrong')
			} else {
				err.result.lastErrorObject.token = jwt.sign({ email: email }, process.env.secret_key, {
					expiresIn: '1hr'
				})
				res.send(err.result.lastErrorObject)
			}
		}
	)
})


// make admin or remove admin
router.put('/roles/:email', async (req, res) => {
	const query = { email: req.params.email }
	const roles = req.body.roles
	const user = await User.findOne({ query })
	const updatedDoc = {
		$set: {
			...user,
			roles: roles
		}
	}
	User.findOneAndUpdate(
		query, updatedDoc, { upsert: true }, (err, doc) => {
			console.log('hello')
			res.send({ err: err, doc: doc })
		}
	)

})


module.exports = router
