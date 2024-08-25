const router = require("express").Router();
const {logOut, login, register} = require("../handlers/authHandler");
const {registerValidator, loginValidator} = require("../validators/authValidator");

//POST api/auth/login
router.post("/login", loginValidator, login);

//POST api/auth/signup
router.post("/register", registerValidator, register);

//POST api/auth/logout
router.get("/logout", logOut);

module.exports = router;
