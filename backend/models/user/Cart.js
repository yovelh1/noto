const mongoose = require("mongoose");
module.exports = new mongoose.Schema({
	productID: {type: String, required: true},
	color: {type: String, required: true},
	size: {type: String, required: true},
	qty: {type: Number, required: true},
});
