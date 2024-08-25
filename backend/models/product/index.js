const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	category: String,
	title: String,
	description: String,
	img: String,
	price: String,
	color: Array,
});

module.exports = mongoose.model("Product", schema);
