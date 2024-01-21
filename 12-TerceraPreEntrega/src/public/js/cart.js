// cart.js
// JS de Página en la que se permite crear y agregar productos a un carrito 
// crea socket en Cliente 

const socket = io();
console.log("Connected Carrito desde el cart");

// Busca el elemento en el DOM utilizando el ID
const idUsuarioElement = document.getElementById('idUsuario');


// Accede al contenido del elemento (que será el valor renderizado por Handlebars)
const idUsuarioValue = idUsuarioElement.textContent.trim();

// Asigna el valor a la variable sUsuario
let sUsuario = idUsuarioValue;

// Recupera el valor almacenado en sessionStorage
let sCarrito = sessionStorage.getItem('carrito');
let sCantidad = sessionStorage.getItem('cantidad');
let sMonto = sessionStorage.getItem('monto');

// Si el valor no existe (es null), establece carrito en una cadena vacía
let carrito = sCarrito === null ? "" : sCarrito;
let nuevoUsuario = sUsuario === null ? "" : sUsuario;

let cantidadCarrito = sCantidad === null ? 0 : parseInt(sCantidad);
let montoTotal = sMonto === null ? 0 : parseFloat(sMonto);

//const userElement = document.getElementById('usuario');
//userElement.innerText = `Usuario:  ${nuevoUsuario}`;

const campoElement = document.getElementById('carrito');
campoElement.innerText = `ID Carrito: ${carrito}`;

const carritoElement = document.getElementById('carritoCantidad');
carritoElement.innerText = `Cant. Prod.: ${cantidadCarrito}`;

const carritoMonto = document.getElementById('montoTotal');
carritoMonto.innerText = `Monto Total: ${montoTotal} Pesos  `;


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
            console.log("botón agregar");

            var codigoProducto = button.closest('tr').id;
            var precioProducto = parseFloat(button.closest('tr').querySelector('td:nth-child(4)').innerText);

            if (carrito == "") {
                console.log("no existe carrito se procede a crearlo")
                socket.emit('crear_carrito', codigoProducto, nuevoUsuario);

            } else {
                console.log("agregar producto al carrito");
                socket.emit('agregar_producto_carrito', codigoProducto, carrito);

            }

            // Lógica para agregar el producto con el código especificado al carrito
            console.log("Agregar al carrito producto con código:", codigoProducto);
        });
    });


    // Obtén el botón por su clase
    var verCartButton = document.querySelector('.ver-cart');

    verCartButton.addEventListener('click', function () {
        // Obtén el valor del ID del carrito
        //var carritoId = document.getElementById('carrito').textContent;
        if (!carrito) {
            console.log("no existe carrito")
        } else {
            // Construye la URL con el ID del carrito
            var url = 'http://localhost:8080/api/carts/customer/' + carrito;
            window.open(url, '_blank');
        }
    });

});

socket.on("carritoCreado", (carritoId, precioProducto) => {
    console.log(carritoId);
    carrito = carritoId;
    cantidadCarrito++;
    montoTotal = montoTotal + precioProducto;

    const campoElement = document.getElementById('carrito');
    campoElement.innerText = `${carritoId}`;

    const carritoElement = document.getElementById('carritoCantidad');
    carritoElement.innerText = `Carrito: ${cantidadCarrito} Productos ingresados  `;

    const carritoMonto = document.getElementById('montoTotal');
    carritoMonto.innerText = `Monto Total: ${montoTotal} Pesos  `;
    sessionStorage.setItem('carrito', carrito);
    sessionStorage.setItem('cantidad', cantidadCarrito);
    sessionStorage.setItem('monto', montoTotal);


});

socket.on("carritoActualizado", (precioProducto) => {
    cantidadCarrito++;
    montoTotal = montoTotal + precioProducto;

    const carritoElement = document.getElementById('carritoCantidad');
    carritoElement.innerText = `Carrito: ${cantidadCarrito} Productos ingresados  `;

    const carritoMonto = document.getElementById('montoTotal');
    carritoMonto.innerText = `Monto Total: ${montoTotal} Pesos  `;

    sessionStorage.setItem('cantidad', cantidadCarrito);
    sessionStorage.setItem('monto', montoTotal);

});

socket.on("stockInsuficiente", (codigoProducto) => {

    console.log("NO se puede agregar al carrito no posee Stock el producto con:", idProducto);

});




