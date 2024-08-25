const router = require("express").Router();
const {getCategoryProducts, getProduct, getSalesProducts} = require("../handlers/productHandler");

//GET api/product/sales-products
router.get("/sales-products", getSalesProducts);

//GET api/product/category/:categoryId
router.get("/category/:categoryId", getCategoryProducts);

//GET api/product/:productId
router.get("/:productId", getProduct);

module.exports = router;
