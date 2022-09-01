const express = require("express");
const app = express();
const fs = require("fs");
class Producto {
  constructor(archivo) {
    this.archivo = archivo;
  }
  //Obtener todos los Productos
  getAll() {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    return dataParseada;
  }
  //Obtener Productos Random
  getRandom() {
    const data = this.getAll();
    const idRandom = parseInt(Math.random() * data.legth);
    return data[idRandom];
  }
}
const data = new Producto("products.txt");

//TODAS LAS RUTAS VIENEN ACA
app.get("/", (req, res) => {
  res.send(
    "<h1>Bienvenidos a esta tienda :) </h1> <h4>Tienda de Juan Felipe Cerquin</h4>"
  );
});
app.get("/products", (req, res) => {
  res.send(data.getAll());
});
app.get("/productsRandom", (req, res) => {
  const idRandom = parseInt(Math.random() * data.legth);
  res.send([data.getRandom()]);
});
//EL SERVER VA AL ULTIMO
app.listen(8080, () => {
  console.log("Servidor online :)");
});
