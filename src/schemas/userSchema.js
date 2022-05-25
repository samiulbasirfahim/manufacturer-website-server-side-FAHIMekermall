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
	education: {
		type: String,
		default: 'education not set'
	},
	location: {
		type: String,
		default: 'location not set'
	}, phone: {
		type: Number,

	},
	linkedin: {
		type: String,
	},
	facebook: {
		type: String,
	},

	roles: {
		type: String,
		default: 'user'
	}
})

module.exports = userSchema
