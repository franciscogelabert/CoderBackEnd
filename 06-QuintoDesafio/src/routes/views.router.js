import express from 'express';
import socketServer from '../app.js';
import Product from '../../class/Product/Product.js';
import ProductManager from '../../class/Product/ProductManager.js';
import FileManager from '../../class/FileSystem/FileManager.js';
import __dirname from '../utils.js';
import connect  from '../db/connect.js';

const farchivo = new FileManager('productos.json', `${__dirname}/files`);

//connect();

 // creo el ProductManager
 const lp = new ProductManager(farchivo);

const viewsRouter = express.Router();

// Ruta para manejar la solicitud de la página de inicio
viewsRouter.get('/db', (req, res) => {

    lp.getProducts()
          .then((result) => {
            connect();
            res.render('index', {
                layout: 'home',
                Saludo: 'Base de datos lista para usarse', //lp.lista
                food: result //lp.lista
                 
              });
          }).catch((error) => {
              console.error('Error:', error);
          });
  
  });
    
    


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