const express = require("express");
const app = express();
const fs = require("fs");
const productsRouter = require("./productos");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productsRouter);
app.use("/api/productos/:id", productsRouter);
app.use("/", express.static(__dirname + "/public"));
app.listen(8080, () => {
  console.log("Servidor online :)");
});
