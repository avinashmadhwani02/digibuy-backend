const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
	pageId: {
		type: Number,
		required: true
	},
	url: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Url', UrlSchema);