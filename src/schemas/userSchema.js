const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
		default:
			"https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png",
	},
	name: {
		type: String,
	},
	bio: {
		type: String,
	},
})

module.exports = userSchema
