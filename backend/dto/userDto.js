module.exports = class {
	constructor({email, fullName, address, cards, cartItems, wishlistItems, orders}) {
		this.email = email;
		this.fullName = fullName;
		this.address = address;
		this.cards = cards;
		this.cartItems = cartItems;
		this.wishlistItems = wishlistItems;
		this.orders = orders;
	}
};
