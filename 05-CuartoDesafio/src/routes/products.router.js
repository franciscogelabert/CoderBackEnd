import express from 'express';
import ProductManager from '../../class/Product/ProductManager.js';
import Product from '../../class/Product/Product.js';
import FileManager from '../../class/FileSystem/FileManager.js';
const productsRouter = express.Router();



const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/05-CuartoDesafio/files');
//const farchivo = new FileManager('productos.json', 'C:/Coderhouse/Backend/05-CuartoDesafio/files');


// creo el ProductManager
const lp = new ProductManager(farchivo);

// renderiza el index con el Form 

productsRouter.get('/handler', (req, res) => {
    res.render('index');
});


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



productsRouter.post('/handler/', (req, res) => {
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


export { productsRouter };