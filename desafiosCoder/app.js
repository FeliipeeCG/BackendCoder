const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const indexRoute = require("./routes/indexRoutes");
app.set("port", 8080);
app.set("json spaces", 2);
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/", indexRoute);

module.exports = app;
