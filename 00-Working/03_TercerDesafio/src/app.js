/*  Server  */

import ProductManager from '../class/ProductManager.js';
import FileManager from '../class/FileManager.js';
import express from 'express';


const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de datos y la ruta

const farchivo = new FileManager('archivo.json', 'C:/Proyectos/Coder/03-TercerDesafio');
//const farchivo = new FileManager('archivo.json', 'C:/Coderhouse/Backend/03-TercerDesafio');


// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 1 - Se crea el Product Manager');


app.get('/products', (req, res) => {
    lp.getProducts()
        .then(() => {
            const limitQuery = req.query.limit;

            if (limitQuery) {

                const limitItems = lp.lista.slice(0, limitQuery);
                res.send(limitItems);

            } else {
                // Devolver a todos los usuarios si no se proporciona el query parameter
                res.send(lp.lista);
            }
        })
        .catch(error => {
            console.error('Error al cargar la lista de productos:', error);
        });
})

app.get('/products/:id', (req, res) => {
    const id = req.params.id; // Obtener el valor de 'id' de los parámetros de la URL

    lp.getProductById(id)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            console.error('Error:', error);
        });
})

app.get('/products/code/:cod', (req, res) => {
    const cod = req.params.cod;

    lp.getProductByCode(cod)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            console.error('Error:', error);
        });
})

app.listen(port, () => { console.log("Escuchando en Puerto: ", { port }) })


