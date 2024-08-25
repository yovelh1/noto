const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	addressName: {type: String, required: [true, "this filed is required"]},
	city: {type: String, required: [true, "this filed is required"]},
	street: {type: String, required: [true, "this filed is required"]},
	zipCode: {type: String, required: [true, "this filed is required"]},
	default: Boolean,
});
