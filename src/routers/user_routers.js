// import
const express = require("express")
const mongoose = require("mongoose")
const verifyToken = require("../middleware/verifyToken")
const userSchema = require("../schemas/userSchema")
const jwt = require("jsonwebtoken")
const router = express.Router()
const User = new mongoose.model("User", userSchema)

// get all users
router.get("/", (req, res) => {
	res.send('hello world')
})

// add user and issue token

router.put('/', async (req, res) => {
	const userInfo = req.body
	if (!userInfo.email) {
		return res.status(403).send({ Message: 'Invalid user info' })
	} if (userInfo.roles) {
		return res.status(403).send({ message: "You cant make admin when you create a account" })
	} if (userInfo.email) {
		User.findOneAndUpdate(
			{ email: userInfo.email },
			{ $set: userInfo },
			{ upsert: true, new: true }, (err, user) => {
				if (err) {
					return res.status(500).send({ message: "there was a server side error" })
				} else {
					user.token = jwt.sign({ email: user.email }, process.env.secret_key, {
						expiresIn: '1d'
					})
					res.status(200).send({ user: user, token: user['token'] })
				}
			})
	}
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
		query, updatedDoc, { upsert: true }, (err, data) => {
			if (err) {
				return res.status(500).send({ message: "there was a server side error" })
			} else {
				res.send(data)
			}
		}
	)

})

// get user number 
router.get('/count', async (req, res) => {
	User.find().count((err, count) => { res.send({ count }); });
})


// get user data
router.get('/:email', async (req, res) => {
	const user = await User.findOne({ email: req.params.email })
	res.send(user)
})

// edit user
router.put("/:email", async (req, res) => {
	await User.updateOne({ email: req.params.email }, { $set: { ...req.body } })
		.then((data) =>
			res.send(data)
		)
		.catch(
			error => {
				res.status(500).send({ message: "there was a server side error" })
			}
		);

})



module.exports = router
