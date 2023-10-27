import express from 'express';
import Cart from '../../class/Cart/Cart.js';
import CartManager from '../../class/Cart/CartManager.js';
import FileManager from '../../class/FileSystem/FileManager.js';
const cartsRouter = express.Router();

// Array para almacenar mascotas
const products = [];

const farchivo = new FileManager('carrito.json', 'C:/Proyectos/Coder/04-PrimeraEntrega/files');
//const farchivo = new FileManager('carrito.json', 'C:/Coderhouse/Backend/04-PrimeraEntrega/files');


const listaAux=[];


// creo el CartManager
const lc = new CartManager(farchivo);
console.log('02 - Se crea el Cart Manager');

// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de datos y la ruta



cartsRouter.get('/', (req, res) => {
    lc.getCarts()
        .then((result) => {
            res.send(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

cartsRouter.get('/:id', (req, res) => {

    const id = req.params.id;

    lc.getCartsById(id).then((result) => {
        res.send(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
})


cartsRouter.get('/code/:cod', (req, res) => {
    const cod = req.params.cod;

    lc.getProductByCode(cod)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            console.error('Error:', error);
        });
})



// !!!!corregir !
// Ruta raíz para agregar una mascota
cartsRouter.post('/', (req, res) => {
    const id = req.query.id;
    const codProd = req.query.codProd;
    lc.addProductCart(codProd, id);
    res.status(201).json('Producto actualizado');
 });
 



// Ruta raíz para agregar una mascota
cartsRouter.post('/', (req, res) => {
   const newCart = new Cart(req.body);
   lc.addCart(newCart);
   res.status(201).json(newCart);
});

export { cartsRouter };