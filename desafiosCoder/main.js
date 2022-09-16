const express = require("express");
const app = express();
const fs = require("fs");
const indexAPI = require("./routes/index");
const productsRouter = require("./productos");
app.use(express.json());
app.use("/api/productos", productsRouter);
app.use("/", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos/:id", productsRouter);
app.set("views", __dirname + "/views");
//config nueva
const { engine } = require("express-handlebars");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("view engine", "hbs");
app.use("/", indexAPI);
app.use("/", (res) => {
  res.render("index");
});
app.listen(8080, () => {
  console.log("Servidor online :)");
});
