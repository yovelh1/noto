require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
const {mOut} = require("./utils");
const {authController, productController, userController} = require("./controllers");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.static("public"));

//connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_ACCESS_LINK, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//set cookie parser
app.use(cookieParser());

//routes
app.use("/api/user", userController);
app.use("/api/product", productController);
app.use("/api/auth", authController);

//frontend
app.get("/*", (req, res, next) => {
	if (!req.accepts().indexOf("text/html") === -1) next();
	res.sendFile("index.html", {root: path.join(__dirname, "public")});
});

//general error
app.use((req, res) => {
	mOut({status: 500, data: "internal server error", res});
});

//checkups
mongoose.connection.on("connected", () => {
	console.log("DB is conected");
});
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

module.exports = app;
