const express = require("express"); 
const router = express.Router(); 
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json"); 

//Ruta /products que me muestra el listado actual de mis productos. 

router.get("/products", async (req, res) => {
    const productos = await manager.getProducts(); 

    res.render("home", {productos});
})

// Ruta /realtimeproducts
router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");
})


module.exports = router; 