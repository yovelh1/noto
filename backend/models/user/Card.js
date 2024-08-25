const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	number: {type: String, required: [true, "Invalid card ID"], minLength: [16, "Invalid card ID"]},
	date: {type: String, required: [true, "Invalid date"], minLength: [5, "Invalid date"]},
	cvv: {type: String, required: [true, "Invalid CVV"], minLength: [3, "Invalid CVV"]},
	company: {type: String, required: [true, "you must use visa or Muster Card"]},
	default: Boolean,
});
