const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
	pageId: {
		type: Number,
		required: true
	},
	pageData: {
		type: String,
		required: false
	},
	components: {
		type: String,
		required: false
	}

})

module.exports = mongoose.model('Page', PageSchema);