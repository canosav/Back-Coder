const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.ultId = 0;
        //carga carritos almaceados
        this.cargarCarritos();
    }

    async cargarCarritos() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                //verifico si hay elemento y calculo el ult id 
                this.ultId = Math.max(...this.carts.map(cart => cart.id)); 
            }
        } catch (error) {
            console.log("Error al cargar el carrito");
            //si no extiste el archivo lo crea
            await this.guardarCarritos();
        }
    }

    async guardarCarritos() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    
    async crearCarrito() {
        const nuevoCarrito = {
            id: ++this.ultId,
            products: []
        };

        //push en el array el nuevo carrito 
        this.carts.push(nuevoCarrito);

        //guardar el array en el archivo
        await this.guardarCarritos();
        return nuevoCarrito;
    }

    async getCarritoById(carritoId) {
        try {
            const carritoBuscado = this.carts.find(carrito => carrito.id === carritoId);

            if (!carritoBuscado) {
                return console.log("No existe un carrito con ese id");
            }else{          
                return carritoBuscado;
            }

        } catch (error) {
            console.log("Error al obtener el carrito por id", error);
     
        }
    }

    async agregarProductoAlCarrito(carritoId, productoId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(carritoId);
            const existeProducto = carrito.products.find(prod => prod.product === productoId);
            // Agrego si no existe, sino modifico la cantidad
            if (existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({ product: productoId, quantity });
            }
            //guardo carrito
            await this.guardarCarritos();
            return carrito;
        } catch (error) {
            console.log("Error al agregar producto al carrito:", error);
            
        }
    }
    

  
}

module.exports = CartManager; 