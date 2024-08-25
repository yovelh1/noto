require("dotenv").config();
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const Address = require("./Address");
const Card = require("./Card");
const Cart = require("./Cart");
const Order = require("./Order");

const schema = new mongoose.Schema({
	fullName: {type: String, required: [true, "this filed is required"]},
	email: {
		type: String,
		unique: [true, "user already exist"],
		validate: {
			validator: function (v) {
				return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
			},
			message: (props) => `${props.value} is not a valid email`,
		},
		required: [true, "this filed is required"],
	},
	password: {
		type: String,
		required: [true, "this filed is required"],
		minLength: [8, "password must contain at least 8 characters"],
	},
	address: [Address],
	cards: [Card],
	cartItems: [Cart],
	wishlistItems: [Cart],
	orders: [Order],
});

schema.plugin(encrypt, {
	secret: process.env.PASSWORD_SECRET,
	encryptedFields: ["password", "cards", "address"],
});

module.exports = mongoose.model("User", schema);
