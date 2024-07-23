const express = require("express");
const router = express.Router();
const CartManager = require("../managers/cart-manager.js");
const cartManager = new CartManager("./src/data/carts.json");

//crea nuevo carrito: 

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})

//lista los productos que pertenezcan al carrito con el parámetro cid proporcionados.

router.get("/:cid", async (req, res) => {
    const carritoID = parseInt(req.params.cid);
    try {
        const carritoBuscado = await cartManager.getCarritoById(carritoID);
        res.json(carritoBuscado.products);
    } catch (error) {
        res.status(500).send("Error del servidor al buscar un carrito");
    }
})

//agrega productos a distintos carritos

router.post("/:cid/product/:pid", async (req, res) => {
    const carritoId = parseInt(req.params.cid);
    const productoId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const carritoActualizado = await cartManager.agregarProductoAlCarrito(carritoId, productoId, quantity);
        res.json(carritoActualizado.products);
    } catch (error) {
        res.status(500).send("Error al ingresar un producto al carrito");
    }
})


module.exports = router; 