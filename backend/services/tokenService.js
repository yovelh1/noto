require("dotenv").config();
const jwt = require("jsonwebtoken");

async function createToken(userId) {
	const token = await jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
	return token;
}

async function authToken(token) {
	try {
		if (!token.includes("Bearer ")) return {};
		token = token.replace("Bearer ", "");
		return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch {
		return {};
	}
}

module.exports = {createToken, authToken};
