import express from 'express';
import ProductManager from '../../class/Product/ProductManager.js';
import FileManager from '../../class/FileSystem/FileManager.js';
const productsRouter = express.Router();



const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/04-PrimeraEntrega/files');
//const farchivo = new FileManager('productos.json', 'C:/Coderhouse/Backend/04-PrimeraEntrega');


// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 1 - Se crea el Product Manager');

// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de datos y la ruta

productsRouter.get('/', (req, res) => {
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

productsRouter.get('/:id', (req, res) => {
    
    const id = req.params.id; 

    lp.getProductById(id)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            console.error('Error:', error);
        });
})

productsRouter.get('/code/:cod', (req, res) => {
    const cod = req.params.cod;

    lp.getProductByCode(cod)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            console.error('Error:', error);
        });
})


export { productsRouter };