const router = require("express").Router();
const {
	getUser,
	addToCart,
	deleteFromCart,
	addCard,
	deleteCard,
	addAddress,
	deleteAddress,
	updateUserFiled,
	setDefault,
	pay,
} = require("../handlers/userHandler");
const {authorization} = require("../handlers/authHandler");
const {
	userFieldsValidator,
	addToCartFieldsValidator,
	deleteFromCartValidator,
	addCardValidator,
	deleteCardValidator,
	addAddressValidator,
	deleteAddressValidator,
	setDefaultValidator,
	payValidator,
} = require("../validators/userValidator");

//GET /api/user
router.get("/", authorization, getUser);

//POST  /api/user/card/add
router.post("/card/add", authorization, addCardValidator, addCard);

//POST  /api/user/card/delete
router.post("/card/delete", authorization, deleteCardValidator, deleteCard);

//POST  /api/user/address/add
router.post("/address/add", authorization, addAddressValidator, addAddress);

//POST  /api/user/address/delete
router.post("/address/add", authorization, deleteAddressValidator, deleteAddress);

//POST  /api/user/cart/add
//POST  /api/user/wishlist/add
router.post("/:key/add", authorization, addToCartFieldsValidator, addToCart);

//POST  /api/user/cart/delete
//POST  /api/user/wishlist/delete
router.post("/:key/delete", authorization, deleteFromCartValidator, deleteFromCart);

//POST  /api/user/update-field
router.post("/update-field", authorization, userFieldsValidator, updateUserFiled);

//POST /api/user/set-default
router.post("/:key/set-default", setDefaultValidator, setDefault);

//POST /api/user/pay
router.post("/pay", payValidator, pay);

module.exports = router;
