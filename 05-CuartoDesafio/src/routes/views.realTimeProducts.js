import express from 'express';
import Product from '../../class/Product/Product.js';
import ProductManager from '../../class/Product/ProductManager.js';
import FileManager from '../../class/FileSystem/FileManager.js';



//const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/05-CuartoDesafio/files');
const farchivo = new FileManager('productos.json', 'C:/Coderhouse/Backend/05-CuartoDesafio/files');

// creo el ProductManager
const lp = new ProductManager(farchivo);

const viewsrealTimeProducts = express.Router();

viewsrealTimeProducts.get('/', (req, res) => {

    lp.getProducts()
        .then((result) => {
            res.render('index', {
                layout: 'realTimeProducts',
                food: result
            });
        }).catch((error) => {
            console.error('Error:', error);
        });

});

viewsrealTimeProducts.post('/', (req, res) => {
    let thumbnail = [];
    thumbnail.push(req.body.thumbnail1);
    thumbnail.push(req.body.thumbnail2);
    const newProduct = new Product(req.body.title, req.body.description, req.body.code, req.body.price, req.body.stock, thumbnail, req.body.estado, req.body.category);
    lp.addProduct(newProduct);
    res.status(201).json('Producto agregado');
});

export { viewsrealTimeProducts };