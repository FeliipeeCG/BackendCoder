const express = require("express");
const { Router } = express;
const router = Router();
const Producto = require("./data");
const constructor = new Producto("./productos.txt");

let Products = [];
//GET API PRODUCTOS
router.get("/", (req, res) => {
  res.send(Products);
});
//GET API PRODUCTOS /:ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id > Products.length) {
      throw new Error("No existe este ID");
    }
    let user = Products.find((item) => item.id == id);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("ERROR" + err);
  }
});
//POST
router.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;
  let id = Products.length + 1;

  Products.push({ title, price, thumbnail, id });
  res.send({ added: { title, price, thumbnail, id } });
});
//PUT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id > Products.length) {
      throw new Error("Id inexistente");
    }
    let { title, price, thumbnail } = req.body;
    let index = Products.findIndex((item) => item.id == id);
    Products[index] = { title, price, thumbnail, id };
    res.send({ cambiado: Products[index] });
  } catch (err) {
    console.log("No se ha encontrado ningun producto");
    res.status(400).send("Error" + err);
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id > Products.length) {
      throw new Error("Id inexistente");
    }
    let index = Products.findIndex((item) => item.id == id);
    Products.splice(index, 1);
    res.send("Borrado");
  } catch (err) {
    console.log("No se ha encontrado ningun producto");
    res.status(400).send("Error" + err);
  }
});

module.exports = router;
