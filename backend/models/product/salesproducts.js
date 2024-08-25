const mongoose = require("mongoose");

const schema = new mongoose.Schema(Array);

module.exports = mongoose.model("salesProducts", schema);
