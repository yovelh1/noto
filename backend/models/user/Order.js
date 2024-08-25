const mongoose = require("mongoose");
const Cart = require("./Cart");
const Address = require("./Address");

module.exports = new mongoose.Schema({
	items: [Cart],
	address: Address,
});
