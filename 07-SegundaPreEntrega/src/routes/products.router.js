import express from 'express';
import ProductManager from '../../class/Product/ProductManager.js';
import ProductManagerDB from '../../class/Product/ProductManagerDB.js';
import Product from '../../class/Product/Product.js';
import FileManager from '../../class/dao/FileSystem/FileManager.js';
const productsRouter = express.Router();
import __dirname from '../utils.js';




//const farchivo = new FileManager('productos.json', `${__dirname}/files`);

// creo el ProductManager para FileSystem
//const lp = new ProductManager(farchivo);

// creo el ProductManager para Base de datos
const lp = new ProductManagerDB();


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

productsRouter.get('/customer/:id', (req, res) => {
    const id = req.params.id;
     lp.getProductById(id)
        .then((result) => {
            res.render('index', {
                layout: 'product',
                prod: result
               }); 
        }).catch((error) => {
            console.error('Error:', error);
        });
})


productsRouter.post('/', (req, res) => {

    const newProduct = new Product(req.body.title, req.body.description, req.body.code, req.body.price, req.body.stock, req.body.thumbnail, req.body.estado, req.body.category);
    lp.addProduct(newProduct);
    res.status(201).json('Producto agregado');
});

productsRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const newProduct = new Product(req.body.title, req.body.description, req.body.code, req.body.price, req.body.stock, req.body.thumbnail, req.body.estado, req.body.category);
    lp.updateProductById(id, newProduct);
    res.status(201).json({ message: `Producto ${newProduct.title} modificado` });
});

productsRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    lp.deleteProductById(id);
    res.status(201).json({ message: `Producto con ID ${id} eliminado` });
});

productsRouter.get('/code/:cod', (req, res) => {
    const cod = req.params.cod;

    lp.getProductByCode(cod)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            console.error('Error:', error);
        });
})

productsRouter.get('/customer/code/:cod', (req, res) => {
    const cod = req.params.cod;
    lp.getProductByCode(cod)
    .then((result) => 
    {       res.render('index', {
            layout: 'product',
            prod: result[0]          
        }); 

    })
        .catch(error => {
            console.error('Error:', error);
        });
})



export { productsRouter };