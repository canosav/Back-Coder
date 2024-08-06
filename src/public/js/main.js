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
// document.getElementById('datosForm').addEventListener('submit', function(e) {
//     e.preventDefault(); 
//     const title = document.getElementById('title').value;
//     const description = document.getElementById('description').value;
//     const price = document.getElementById('price').value;
//     const img = document.getElementById('img').value;
//     const code = document.getElementById('code').value;
//     const stock = document.getElementById('stock').value;

//     const datosUsuario = { title, description, price, img, code, stock };

//     socket.emit('nuevoUsuario', datosUsuario); 
// });
