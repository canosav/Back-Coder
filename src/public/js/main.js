const socket = io();

//recibir array
socket.on("productos", (data) => {
    console.log(data)
    renderProducts(data);
})

const renderProducts = (products) =>{
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "";

    products.forEach( el => {
        const card = document.createElement("div");
        card.innerHTML = `
            <p> ${el.id}  </p>
            <p> ${el.title} </p>
            <p> ${el.price} </p>
            <button> Eliminar </button>
        `
        productsContainer.appendChild(card);

        card.querySelector("button").addEventListener("click", () => {
            borrarProduct(el.id);
        })

    });

}

//envia id al back
const borrarProduct = (id) =>{
    socket.emit("borrarProduct", id );
}  



//formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('datosForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const img = document.getElementById('img').value;
        const code = document.getElementById('code').value;
        const stock = document.getElementById('stock').value;
        
        // Crear un objeto con los datos del formulario
        // const datos = {
        //     title: title,
        //     description: description,
        //     price: price, 
        //     img: img,
        //     code: code,
        //     stock: stock
        // };
        
        // Emitir los datos al servidor
        
        const botonAgregar = document.getElementById('agregar');
        botonAgregar.addEventListener("click", () => {
            cargarProducto(title, description, price, img, code, stock); 
            console.log("entro")
        });
        
        // Limpiar el formulario
        form.reset();
    });
});


const cargarProducto = (title, description, price, img, code, stock) => {
    socket.emit('cargarProducto',  title, description, price, img, code, stock );
    console.log("entro2")
}