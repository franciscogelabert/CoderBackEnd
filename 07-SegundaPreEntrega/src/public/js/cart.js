// cart.js
// crea socket en Cliente 

const socket = io();
console.log("Connected Carrito");

let carrito = "";
let usuario = "";


Swal.fire({
    title: "Ingrese su Usuario: ",
    input: "email",
    inputLabel: "su dirección de correo electrónico",
    inputPlaceholder: "Ingrese su dirección de correo electrónico"
}).then((result) => {
    if (result.isConfirmed) {
        usuario = result.value;
        console.log('Usuario', usuario);
        if (usuario) {
            const userElement = document.getElementById('usuario');
            userElement.innerText = `Usuario:  ${usuario}`;
            Swal.fire(`Usuario Ingresado: ${usuario}`);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los botones "Ver"
    var verButtons = document.querySelectorAll('.ver-btn');

    // Añadir event listener a cada botón "Ver"
    verButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Obtener el código del producto desde el atributo 'data-code' del botón
            var codigoProducto = button.closest('tr').id;

            // Lógica para ver detalles del producto con el código especificado
            console.log("Ver producto con código:", codigoProducto);
        });
    });

    // Obtener todos los botones "Agregar al carrito"
    var agregarButtons = document.querySelectorAll('.agregar-btn');

    // Añadir event listener a cada botón "Agregar al carrito"
    agregarButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Obtener el código del producto desde el atributo 'data-code' del botón

            var codigoProducto = button.closest('tr').id;

            if (carrito == "") {
                console.log("no existe carrito se procede a crearlo")
                console.log("codigoProducto en el cart", codigoProducto);
                console.log("usuario en el cart", usuario);
                socket.emit('crear_carrito', codigoProducto, usuario);
            } else {
                console.log("agregar producto al carrito");
                socket.emit('agregar_producto_carrito', codigoProducto, carrito);
            }

            // Lógica para agregar el producto con el código especificado al carrito
            console.log("Agregar al carrito producto con código:", codigoProducto);
        });
    });
});


socket.on("carritoCreado", (carritoId) => {

    console.log("Carrito creado con ID:", carritoId);
    carrito = carritoId;

    const campoElement = document.getElementById('carrito');
    campoElement.innerText = `Carrito creado con ID: ${carritoId}`;

});

