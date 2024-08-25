const {validationResult, matchedData} = require("express-validator");
module.exports = function (req, res, next) {
	const invalidReq = validationResult(req);
	if (invalidReq.errors.length) return res.status(400).json(invalidReq.mapped());
	req.body = matchedData(req, {locations: ["body"]});
	next();
};
