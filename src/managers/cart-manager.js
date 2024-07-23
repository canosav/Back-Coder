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
            //si no extiste el arch lo crea
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
            console.log("Error al obtener el carrito por id");
            return 
        }
    }

    async agregarProductoAlCarrito(carritoId, productoId, quantity = 1) {
        const carrito = await this.getCarritoById(carritoId);
        const existeProducto = carrito.products.find(p => p.product === productoId);
        //De esta forma chequeo si el producto que estoy recibiendo para agregar al carrito ya esta presente en el. Si existe modifico la cantidad, si no existe lo agrego. 

        if (existeProducto) {
            existeProducto.quantity += quantity;
        } else {
            carrito.products.push({ product: productoId, quantity });
        }

        //Como aca modifique el carrito, ahora tengo que guardar en el archivo: 
        await this.guardarCarritos();
        return carrito;
    }

}

module.exports = CartManager; 