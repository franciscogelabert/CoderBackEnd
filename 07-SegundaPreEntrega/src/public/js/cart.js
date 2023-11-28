// cart.js
// crea socket en Cliente 

const socket = io();
console.log("Connected Carrito desde el cart");

let nuevoUsuario = "";
let carrito = "";
let cantidadCarrito = 0;
let montoTotal = 0;

// Comprueba si el idusuario ya está almacenado en sessionStorage
const usuario = sessionStorage.getItem('idusuario');


if (!usuario) {
    Swal.fire({
        title: "Ingrese su Usuario: ",
        input: "email",
        inputLabel: "su dirección de correo electrónico",
        inputPlaceholder: "Ingrese su dirección de correo electrónico"
    }).then((result) => {
        if (result.isConfirmed) {
            nuevoUsuario = result.value;

            if (nuevoUsuario) {
                sessionStorage.setItem('idusuario', nuevoUsuario);
                const userElement = document.getElementById('usuario');
                userElement.innerText = `Usuario:  ${nuevoUsuario}`;
                Swal.fire(`Usuario Ingresado: ${nuevoUsuario}`);

            }
        }
    });

}

document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los botones "Ver"
    var verButtons = document.querySelectorAll('.ver-btn');
    // Añadir event listener a cada botón "Ver"
    verButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Obtener el código del producto desde el atributo 'data-code' del botón
            var codigoProducto = button.closest('tr').id;
            console.log("codigoProducto--------------->", codigoProducto)
            // Construye la URL con el ID del carrito
            var url = 'http://localhost:8080/api/products/customer/code/' + codigoProducto;

            // Abre la URL en la misma ventana/pestaña
            //window.location.href = url;
            window.open(url, '_blank');
        });
    });

    // Obtener todos los botones "Agregar al carrito"
    var agregarButtons = document.querySelectorAll('.agregar-btn');

    // Añadir event listener a cada botón "Agregar al carrito"
    agregarButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Obtener el código del producto desde el atributo 'data-code' del botón

            var codigoProducto = button.closest('tr').id;
            var precioProducto = parseFloat(button.closest('tr').querySelector('td:nth-child(4)').innerText);

            if (carrito == "") {
                console.log("no existe carrito se procede a crearlo")
                socket.emit('crear_carrito', codigoProducto, nuevoUsuario);
                cantidadCarrito++;
                montoTotal = montoTotal + precioProducto;
            } else {
                console.log("agregar producto al carrito");
                socket.emit('agregar_producto_carrito', codigoProducto, carrito);
                cantidadCarrito++;
                montoTotal = montoTotal + precioProducto;
            }

            const carritoElement = document.getElementById('carritoCantidad');
            carritoElement.innerText = `Carrito: ${cantidadCarrito} Productos ingresados  `;

            const carritoMonto = document.getElementById('montoTotal');
            carritoMonto.innerText = `Monto Total: ${montoTotal} Pesos  `;

            // Lógica para agregar el producto con el código especificado al carrito
            console.log("Agregar al carrito producto con código:", codigoProducto);
        });
    });


    // Obtén el botón por su clase
    var verCartButton = document.querySelector('.ver-cart');

    verCartButton.addEventListener('click', function () {
        // Obtén el valor del ID del carrito
        var carritoId = document.getElementById('carrito').textContent;

        // Construye la URL con el ID del carrito
        var url = 'http://localhost:8080/api/carts/customer/' + carritoId;

        window.open(url, '_blank');
    });


});

socket.on("carritoCreado", (carritoId) => {
    console.log(carritoId);
    carrito = carritoId;
    const campoElement = document.getElementById('carrito');
    campoElement.innerText = `${carritoId}`;

});



