const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	_id: {
		type: Object,
	},
	email: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		default:
			"https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png",
	},
	name: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		default: 'Bio not available'
	},
	roles: {
		type: String,
		default: 'users'
	}
})

module.exports = userSchema
