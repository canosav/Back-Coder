const express = require("express");
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");
const router = express.Router();

//Listar todos los productos: 
router.get("/", async (req, res) => {
    const limit = req.query.limit;
    try {
        const arrayProductos = await manager.getProducts();
        if (limit) {
            res.send(arrayProductos.slice(0, limit));
        } else {
            res.send(arrayProductos);
        }
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})

//Buscar producto por id: 
router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const producto = await manager.getProductById(parseInt(id));

        if (!producto) {
            res.send("Producto no encontrado");
        } else {
            res.send(producto);
        }
    } catch (error) {
        res.send("Error al buscar el id en los productos");
    }
})


//agregar nuevo producto: 
router.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    
    try {
        await manager.addProduct(nuevoProducto); 

        res.status(201).send("Producto agregado exitosamente"); 
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
})

//actualizar producto
router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const productoActualizado = req.body;

        delete productoActualizado.pid;

        await productoService.updateProduct(pid, productoActualizado);

        res.status(201).send("Producto actualizado exitosamente"); 
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

//borrar producto
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await deleteProduct(pid);
        res.status(201).send("Producto eliminado exitosamente"); 
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
      
});

module.exports = router; 