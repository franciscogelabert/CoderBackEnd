import express from 'express';
import ProductManager from '../../class/Product/ProductManager.js';
import FileManager from '../../class/FileSystem/FileManager.js';
const productsRouter = express.Router();

// Array para almacenar mascotas
const products = [];

const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/04-PrimeraEntrega');
//const farchivo = new FileManager('productos.json', 'C:/Coderhouse/Backend/04-PrimeraEntrega');


// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 1 - Se crea el Product Manager');

// Ruta raíz para obtener mascotas
productsRouter.get('/', (req, res) => {
    res.status(200).json(products);
});

// Ruta raíz para agregar una mascota
productsRouter.post('/', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});


// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de datos y la ruta







productsRouter.get('/products', (req, res) => {
    lp.getProducts()
        .then(() => {
            const limitQuery = req.query.limit;

            if (limitQuery) {

                const limitItems = lp.lista.slice(0, limitQuery);
                 res.status(201).json(limitItems);

            } else {
                // Devolver a todos los usuarios si no se proporciona el query parameter
                 res.status(201).json(lp.lista);
            }
        })
        .catch(error => {
            console.error('Error al cargar la lista de productos:', error);
        });
})


export { productsRouter };