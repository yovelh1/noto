const {User, BlackList} = require("../models");
const {userDto} = require("../dto");
const {createToken, authToken} = require("../services/tokenService");

async function logOut(req, res, next) {
	try {
		let token = req.cookie("accessToken");
		if (!token) return res.status(401).json("invalid token");

		res.clearCookie("accessToken");

		const {userId} = await authToken(token);
		if (!userId) return res.json("successful logout");

		const blackList = await BlackList.findOne();
		blackList._doc.list.push(token);
		const save = await blackList.save();
		if (!save) next();
		return res.json("successful logout");
	} catch {
		next();
	}
}

async function login(req, res, next) {
	try {
		const user = await User.findOne({email: req.body.email});
		if (user && user._doc.password === req.body.password) {
			res.cookie("accessToken", await createToken(user._id));
			return res.json(new userDto(user));
		} else return res.status(401).json("one or two of your inputs icorrect");
	} catch {
		next();
	}
}

async function register(req, res, next) {
	try {
		const user = new User({...req.body});
		if (user.validateSync()) return res.status(400).json(user.validateSync().errors);
		const save = await user.save();
		if (!save) next();
		res.cookie("accessToken", await createToken(user._id));
		return res.json(new userDto(user));
	} catch (e) {
		if (e.code === 11000) return res.status(400).json("Email already used.");
		next();
	}
}

async function authorization(req, res, next) {
	try {
		const token = req.headers?.authorization;
		if (!token) {
			res.clearCookie("accessToken");
			return res.status(403).json("Invalid token");
		}

		const blackList = await BlackList.findOne();
		if (blackList && blackList._doc.list.includes(token)) {
			res.clearCookie("accessToken");
			return res.status(403).json("Invalid token");
		}

		const {userId} = await authToken(token);
		if (!userId) {
			res.clearCookie("accessToken");
			return res.status(403).json("Invalid token");
		}

		req.userId = userId;
		next();
	} catch {
		next();
	}
}

module.exports = {
	logOut,
	login,
	register,
	authorization,
};
