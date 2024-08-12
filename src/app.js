const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const exphbs = require('express-handlebars');

const app = express();
const server = http.createServer(app); 
const io = socketIO(server); 

const PUERTO = 8080;

const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const ProductManager = require("./managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");

// Configuramos Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Middleware: 
app.use(express.json());
app.use(express.static("./src/public"));

// Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

//escuchando puerto 
server.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
});


io.on("connection", async (socket) => { 
    console.log("Un cliente se conectó");
    // array a realtimeproducts
    socket.emit("productos", await manager.getProducts());
});

//recibir deleteProducts
io.on("connection", (socket) => {
    socket.on("borrarProduct", async (id) => {
        await manager.deleteProduct(id);
        // Envío productos actualizados
        io.emit("productos", await manager.getProducts()); // Corrección aquí
    });
});

//envie productos 
io.on('connection', (socket) => {
    socket.on('cargarProducto', async (title, description, price, img, code, stock) => {
        console.log("entro")
        console.log(title, description, price, img, code, stock); 
        await manager.addProduct(title, description, price, img, code, stock);
        // Envío productos actualizados
        io.emit("productos", await manager.getProducts());
    });
});



