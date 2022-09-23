const { Router } = require("express");
const router = Router();
const productsRoute = require("./productsRoutes");
const controller = require("../controllers/indexController");
router.get("/", controller.index);
router.use("/api/products", productsRoute);

module.exports = router;
