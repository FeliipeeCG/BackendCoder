const express = require("express");
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
import { MONGODB_URI, PORT, __dirname } from "./config.js";
import bodyParser from "body-parser";
const path = require("path");
const app = express();
const morgan = require("morgan");
const indexRoute = require("./src/routes/indexRoutes");
app.set("port", 8080);
app.set("json spaces", 2);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/", indexRoute);
app.use(
  session({
    secret: "12345",
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
      mongoOptions,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 1000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
module.exports = app;
