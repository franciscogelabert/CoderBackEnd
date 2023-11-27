// cartCustomer.js
// crea socket en Cliente 

const socket = io();
console.log("Connected Carrito desde el cart");


document.addEventListener("DOMContentLoaded", function () {
    // Obtén todos los botones "Eliminar"
    var delButtons = document.querySelectorAll('.del-btn');

    // Añadir event listener a cada botón "Eliminar"
    delButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Obtener el id del tr al que pertenece el botón
            var idProducto = this.closest('tr').id;

            const idCarrito = document.getElementById('idCarrito').outerText;
            console.log("Eliminar producto con id:", idProducto);
            console.log("idCarrito: :", idCarrito);
            socket.emit('eliminar_producto_carrito', idProducto, idCarrito);
        });
    });
});

socket.on("carritoActualizado", (carritoId) => {
    // Construye la URL con el ID del carrito
    var url = 'http://localhost:8080/api/carts/customer/' + carritoId;

    // Abre la URL en la misma ventana/pestaña
    window.location.href = url;

});


