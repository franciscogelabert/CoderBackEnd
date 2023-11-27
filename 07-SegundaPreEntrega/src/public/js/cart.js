// cart.js
// crea socket en Cliente 

const socket = io();
console.log("Connected Carrito");

let carrito = "";
let usuario = "";
let cantidadCarrito=0;
let montoTotal=0;


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
            var precioProducto = parseFloat(button.closest('tr').querySelector('td:nth-child(4)').innerText);

            if (carrito == "") {
                console.log("no existe carrito se procede a crearlo")
                socket.emit('crear_carrito', codigoProducto, usuario);
                cantidadCarrito++;
                montoTotal=montoTotal+precioProducto;
            } else {
                console.log("agregar producto al carrito");
                socket.emit('agregar_producto_carrito', codigoProducto, carrito);
                cantidadCarrito++;
                montoTotal=montoTotal+precioProducto;
            }

            const carritoElement = document.getElementById('carritoCantidad');
            carritoElement.innerText = `Carrito: ${cantidadCarrito} Productos ingresados  `;

            const carritoMonto = document.getElementById('montoTotal');
            carritoMonto.innerText = `Monto Total: ${montoTotal} Pesos  `;

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

