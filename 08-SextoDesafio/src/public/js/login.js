// cart.js
// JS de Página en la que se permite crear y agregar productos a un carrito 
// crea socket en Cliente 

const socket = io();
console.log("Connected Carrito desde el cart");
/*
// Recupera el valor almacenado en sessionStorage
let sCarrito = sessionStorage.getItem('carrito');
let sUsuario = sessionStorage.getItem('usuario');
let sCantidad = sessionStorage.getItem('cantidad');
let sMonto = sessionStorage.getItem('monto');

// Si el valor no existe (es null), establece carrito en una cadena vacía
let carrito = sCarrito === null ? "" : sCarrito;
let nuevoUsuario = sUsuario === null ? "" : sUsuario;

let cantidadCarrito = sCantidad === null ? 0 : parseInt(sCantidad);
let montoTotal = sMonto === null ? 0 : parseFloat(sMonto);


const userElement = document.getElementById('usuario');
userElement.innerText = `Usuario:  ${nuevoUsuario}`;

*/
/******DOINNNGG**** */
/*
let btn_ingresar = document.getElementById('btn_ingresar');

btn_ingresar.addEventListener('click', function () {

    nuevoUsuario = document.getElementById('usuario').value;
    const pass = document.getElementById('pass').value;

    sessionStorage.setItem('usuario', nuevoUsuario);
    sessionStorage.setItem('pass', pass);

   
    // Construye la URL con el ID del carrito
    var url = 'http://localhost:8080/products?page=1&limit=2&category=Fruta&sort=DESC';


    console.log("nuevoUsuario----------------->",nuevoUsuario);
    console.log("pass ----------------->",pass);

    // Abre la URL en la misma ventana/pestaña
    window.location.href = url;
    //window.open(url, '_blank');
});

*/

// Obtén el botón por su clase
/*var btn_ver = document.querySelector('.btn_ver');

btn_ver.addEventListener('click', function () {
    fetch('/getCookie')
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
});*/


function getCookie() {

    fetch('/getCookie')
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

// Asigna el evento click al botón cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    var getCookieButton = document.getElementById('getCookieButton');

    if (getCookieButton) {
        getCookieButton.addEventListener('click', getCookie);
    }
});