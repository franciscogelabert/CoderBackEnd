/*  Server  */

import ProductManager from '../class/ProductManager.js';
import FileManager from '../class/FileManager.js';
import express from 'express';

const app = express();
const port = 8080;

// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de datos y la ruta
const farchivo = new FileManager('archivo.json', 'C:/Proyectos/Coder/03-TercerDesafio');
console.log('00- el archivo es', farchivo.archivo);

// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 1 - Se crea el Product Manager');


app.get('/productos', (req, res) => {

    lp.getProducts()
        .then(() => {
            res.send(lp.lista);
        })
        .catch(error => {
            console.error('Error al cargar la lista de productos:', error);
        });
})




app.get('/saludo', (req, res) => {
    res.send('Hola Express de Node Js 2');
})

app.listen(port, () => { console.log("Escuchando en Puerto: ", { port }) })


