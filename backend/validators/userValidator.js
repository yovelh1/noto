const {body} = require("express-validator");
const validate = require("./validate");

const userFieldsValidator = [
	body("fullName").notEmpty().optional().isString(),
	body("email").notEmpty().isEmail().optional().isString(),
	body("password").notEmpty().isLength({min: 8}).optional(),
	validate,
];

const addToCartFieldsValidator = [
	body("productID").notEmpty().isString(),
	body("color").notEmpty().isString(),
	body("size").notEmpty().isString(),
	body("qty").notEmpty().isLength({min: 1}).isNumeric(),
	validate,
];

const deleteFromCartValidator = [body("productID").notEmpty().isString(), body("color").notEmpty().isString(), validate];

const addCardValidator = [
	body("number").notEmpty().isLength({min: 16}).isString(),
	body("date").notEmpty().isLength({min: 5}).isString(),
	body("cvv").notEmpty().isLength({min: 3}).isString(),
	body("company").notEmpty().isString(),
	validate,
];

const deleteCardValidator = [body("id").notEmpty().isString(), validate];

const addAddressValidator = [
	body("addressName").notEmpty().isString(),
	body("city").notEmpty().isString(),
	body("street").notEmpty().isString(),
	body("zipCode").notEmpty().isString(),
	validate,
];

const deleteAddressValidator = [body("id").notEmpty().isString(), validate];

const setDefaultValidator = [body("id").notEmpty().isString(), validate];

const payValidator = [body("addressId").notEmpty().isString(), body("cardId").notEmpty().isString(), validate];

module.exports = {
	userFieldsValidator,
	addToCartFieldsValidator,
	deleteFromCartValidator,
	addCardValidator,
	deleteCardValidator,
	addAddressValidator,
	deleteAddressValidator,
	setDefaultValidator,
	payValidator,
};
