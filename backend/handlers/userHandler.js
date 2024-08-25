const {User, Product} = require("../models");
const {userDto, cardDto} = require("../dto");

async function getUser(req, res, next) {
	try {
		const user = await User.findById(req.userId);
		if (!user) next();
		return res.json(new userDto(user));
	} catch {
		next();
	}
}

async function updateUserFiled(req, res, next) {
	try {
		const user = await User.findById(req.userId);
		if (!user) next();

		for (var key in req.body) {
			if (!user[key]) continue;
			user[key] = req.body[key];
		}

		const save = await user.save();
		if (!save) next();

		return res.json("fileds updated successfully");
	} catch (e) {
		if (e.code === 11000) return res.status(400).json("Email already used.");
		next();
	}
}

async function addToCart(req, res, next) {
	try {
		const user = await User.findById(req.userId);
		if (!user) next();

		const itemsKey = req.params.key === "cart" ? "cartItems" : req.params.key === "wishlist" && "wishlistItems";
		if (!itemsKey) res.status(404);

		const product = await Product.findById(req.body.productID);
		if (!product || !Object.keys(product.color).includes(req.body.color) || !product.color[req.body.color].includes(req.body.size))
			res.status(400).json("Product not exist");

		const matchedItem = user[itemsKey].findIndex((item) => item.productID === req.body.productID && item.color === req.body.color);
		if (matchedItem > -1) {
			user[itemsKey][matchedItem] = {...user[itemsKey][matchedItem], ...req.body};
			const save = await user.save();
			if (!save) next();
			return res.json("item updated successfully");
		}

		user[itemsKey].push({...req.body});

		const save = await user.save();
		if (!save) next();

		return res.json("fileds added successfully");
	} catch {
		next();
	}
}

async function deleteFromCart(req, res, next) {
	try {
		const user = await User.findById(req.userId);
		if (!user) next();

		const itemsKey = req.params.key === "cart" ? "cartItems" : req.params.key === "wishlist" && "wishlistItems";
		if (!itemsKey) res.status(404);

		user[itemsKey] = user[itemsKey].filter((item) => item.productID !== req.body.productID && item.color !== req.body.color);

		const save = await user.save();
		if (!save) next();

		return res.json("item deleted successfully");
	} catch {
		next();
	}
}

async function addCard(req, res, next) {
	try {
		const user = await User.findById(req.userId);
		if (!user) next();

		const matchedItem = user.cards.findIndex((card) => card.number === req.body.number);
		if (matchedItem > -1) return res.status(400).json("card already exist");

		user.cards.push({...req.body});

		const save = await user.save();
		if (!save) next();

		return res.json(new cardDto(save));
	} catch {
		next();
	}
}

async function deleteCard(req, res, next) {
	try {
		const user = await User.findById(req.userId);
		if (!user) next();

		user.cards = user.cards.filter((card) => card.id !== req.body.id);

		const save = await user.save();
		if (!save) next();

		return res.json("item deleted successfully");
	} catch {
		next();
	}
}

async function addAddress(req, res, next) {
	try {
		const user = await User.findById(req.userId);
		if (!user) next();

		const matchedItem = user.address.findIndex((address) => address.addressName === req.body.addressName && address.city === req.body.city);
		if (matchedItem > -1) {
			user.address[matchedItem] = {...user.address[matchedItem], ...req.body};
			const save = await user.save();
			if (!save) next();
			return res.json("address updated successfully");
		}

		user.address.push({...req.body});

		const save = await user.save();
		if (!save) next();

		return res.json(new addressDto(save));
	} catch {
		next();
	}
}

async function deleteAddress(req, res, next) {
	try {
		const user = await User.findById(req.userId);
		if (!user) next();

		user.address = user.address.filter((address) => address.id === req.body.id);

		const save = await user.save();
		if (!save) next();

		return res.json("item deleted successfully");
	} catch {
		next();
	}
}

async function setDefault(req, res, next) {
	try {
		const user = await User.findById(req.userId);
		if (!user) next();

		const itemsKey = req.params.key === "card" ? "cards" : req.params.key === "address" && "address";
		if (!itemsKey) res.status(404);

		user[itemsKey] = user[itemsKey].map((item) => {
			item.default = req.body.id === item.id;
			return item;
		});

		const save = await user.save();
		if (!save) next();

		res.json(key + " item set successfully");
	} catch {
		next();
	}
}

async function pay(req, res, next) {
	try {
		const user = await User.findById(req.userId);
		if (!user) next();

		const cardIdIndex = user.cards.findIndex((card) => card.id === req.body.cardId);
		if (!cardIdIndex) return res.status(400);

		const address = user.address.find((address) => address.id === req.body.addressId);
		user["orders"].push({
			items: user["cartItems"],
			address,
		});

		user["cartItems"] = [];

		const save = await user.save();
		if (!save) next();

		return res.json(new orderDto(save.orders[save.orders.length - 1]));
	} catch {
		next();
	}
}

module.exports = {
	getUser,
	updateUserFiled,
	setDefault,
	addToCart,
	deleteFromCart,
	addCard,
	deleteCard,
	addAddress,
	deleteAddress,
	pay,
};
