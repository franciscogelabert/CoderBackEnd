
// JS de Página con el listado de productos del Carrito
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

    var endButtons = document.querySelectorAll('.end-btn');

    // Añadir event listener a cada botón "Agregar al carrito"
    endButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Obtener el código del producto desde el atributo 'data-code' del botón

            const idUsuarioElement = document.getElementById('idUser').textContent;
            const idCarrito = document.getElementById('idCarrito').textContent;
            const idCantProd = document.getElementById('idCantProd').textContent;
            const idPriceTotal = document.getElementById('idPriceTotal').textContent;

            // Obtener la fecha y hora actual
            const fechaHora = new Date();
            const fechaHoraString = fechaHora.toLocaleString(); // Convertir a cadena de texto legible


            const order = {
                userId: idUsuarioElement,
                cartId: idCarrito,
                quantity: idCantProd,
                totalPrice: idPriceTotal,
                orderDate: fechaHoraString,
                state: 'Pendiente'
            };
            socket.emit('crear_orden', order);

        });
    });




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

socket.on("ordenCreada", (idOrden) => {

    console.log("Orden creada:",idOrden );
    const newOrder = idOrden.newOrder;

     // Muestra el cartel con los datos de la orden usando SweetAlert2
    Swal.fire({
        title: 'Orden Creada',
        html: `
            <p><strong>ID de Orden:</strong> ${newOrder._id}</p>
            <p><strong>ID de Carrito:</strong> ${newOrder.cartId}</p>
            <p><strong>Fecha de Orden:</strong> ${newOrder.orderDate}</p>
            <p><strong>Cantidad:</strong> ${newOrder.quantity}</p>
            <p><strong>Estado:</strong> ${newOrder.state}</p>
            <p><strong>Total:</strong> ${newOrder.totalPrice}</p>
            <p><strong>ID de Usuario:</strong> ${newOrder.userId}</p>
        `,
        icon: 'success'
    });

});


