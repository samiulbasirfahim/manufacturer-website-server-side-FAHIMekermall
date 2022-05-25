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
			"https://i.ibb.co/LvsrvZL/126178784-person-gray-photo-placeholder-man-in-a-costume-on-white-background.webp",
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
