const {body} = require("express-validator");
const validate = require("./validate");

const registerValidator = [body("fullName").notEmpty(), body("email").notEmpty().isEmail(), body("password").notEmpty().isLength({min: 8}), validate];
const loginValidator = [body("email").notEmpty().isEmail(), body("password").notEmpty().isLength({min: 8}), validate];

module.exports = {registerValidator, loginValidator};
