const {Product, SalesProducts} = require("../models");

function getCategoryProducts(req, res) {
	Product.find({category: req.params.categoryId}, (err, products) => {
		if (err) return res.status(500).json("internal server error");
		if (!products?.length) return res.status(404).json("no products found");
		return res.json(products);
	});
}

function getProduct(req, res) {
	Product.findById(req.params.productId, (err, product) => {
		if (err || !product) return res.status(500).json("internal server error");
		if (!product) return res.status(404).json("no product found");
		return res.json(product);
	});
}

function getSalesProducts(req, res) {
	SalesProducts.find((err, products) => {
		if (err) return res.status(500).json("internal server error");
		if (!products?.length) return res.status(404).json("no products found");
		return res.json(products);
	});
}

module.exports = {getCategoryProducts, getProduct, getSalesProducts};
