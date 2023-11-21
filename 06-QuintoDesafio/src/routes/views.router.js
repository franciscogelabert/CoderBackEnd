import express from 'express';
import socketServer from '../app.js';
import Product from '../../class/Product/Product.js';
import ProductManager from '../../class/Product/ProductManager.js';
import FileManager from '../../class/dao/FileSystem/FileManager.js';
import __dirname from '../utils.js';
import { productModel } from '../../class/Dao/MongoDB/models/product.model.js';



const farchivo = new FileManager('productos.json', `${__dirname}/files`);

const viewsRouter = express.Router();

// Ruta para probar la conexión
viewsRouter.get('/api/realTimeProducts', async (req, res) => {
    try {
        let result = await productModel.find();
         res.render('index', {
            layout: 'realTimeProducts',
            food: result //lp.lista

        });
    }
    catch (error) {
        console.log("Error:  ", error);
    }
})


// Ruta para probar la conexión
viewsRouter.get('/api', async (req, res) => {
    try {
        let result = await productModel.find();
        res.render('index', {
            layout: 'home',
            food: result //lp.lista

        });
    }
    catch (error) {
        console.log("Error:  ", error);
    }
})

// Ruta para probar la conexión
viewsRouter.get('/chat', async (req, res) => {
    try {
        let result = await productModel.find();
        res.render('index', {
            layout: 'chat',
            food: result //lp.lista

        });
    }
    catch (error) {
        console.log("Error:  ", error);
    }
})

// Ruta para realizar un POst desde Postman 
viewsRouter.post('/db', async (req, res) => {
    try {

        const newProduct = new productModel({
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            price: req.body.price,
            stock: req.body.stock,
            thumbnail: req.body.thumbnail,
            estado: req.body.estado,
            category: req.body.category
        });
        // Guarda el nuevo producto en la base de datos
        const result = await newProduct.save();
        res.send({ result: 'success', payload: result });
        console.log("Post -> DB");
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).send({ result: 'error', message: 'Error al insertar el producto en la base de datos' });
    }
});

// creo el ProductManager
const lp = new ProductManager(farchivo);


// Ruta para manejar la solicitud de la página de inicio
viewsRouter.get('/', (req, res) => {
    lp.getProducts()
        .then((result) => {
                res.render('index', {
                layout: 'home',
                food: result //lp.lista
            });
        }).catch((error) => {
            console.error('Error:', error);
        });

});

viewsRouter.get('/realTimeProducts', (req, res) => {
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

viewsRouter.post('/realTimeProducts', (req, res) => {
    const newProduct = new Product(req.body.title, req.body.description, req.body.code, req.body.price, req.body.stock, req.body.thumbnail, req.body.estado, req.body.category);
    lp.addProduct(newProduct);
    socketServer.emit("productAdded", newProduct);
    res.status(201).json('Producto agregado');
});


export { viewsRouter };