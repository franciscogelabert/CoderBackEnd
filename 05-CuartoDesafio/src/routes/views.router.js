import express from 'express';

import ProductManager from '../../class/Product/ProductManager.js';
import FileManager from '../../class/FileSystem/FileManager.js';

//const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/05-CuartoDesafio/files');
const farchivo = new FileManager('productos.json', 'C:/Coderhouse/Backend/05-CuartoDesafio/files');

 // creo el ProductManager
 const lp = new ProductManager(farchivo);

const viewsRouter = express.Router();

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

viewsRouter.get('/realTimeProducts/', (req, res) => {

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


export { viewsRouter };