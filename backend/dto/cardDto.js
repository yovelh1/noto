module.exports = class {
	constructor(card) {
		this.id = card.id;
		this.number = "**** **** **** " + card.number.split(" ")[3];
		this.date = card.date;
		this.company = card.company;
		this.default = card.default;
	}
};
