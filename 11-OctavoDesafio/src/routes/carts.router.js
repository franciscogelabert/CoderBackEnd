import express from 'express';
import Cart from '../class/Dao/Cart/Cart.js';
import CartManagerDB from '../class/Dao/Cart/CartManagerDB.js';
import __dirname from '../utils.js';

const cartsRouter = express.Router();


const lc = new CartManagerDB();


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

cartsRouter.get('/customer/:id', (req, res) => {

    const id = req.params.id;
    lc.getCartById(id).then((result) => 
    {
        res.render('index', {
            layout: 'carts',
            itemCart: result.lista,
            IdUser: result.IdUser,
            IdCart: id,
            cantProd: result.cantProd,
            precioTotal:result.precioTotal
        }); 

    })
        .catch(error => {
            console.error('Error:', error);
        });
})

cartsRouter.post('/', (req, res) => {
    console.log(req.body);

    const newCart = new Cart(req.body);

    console.log(newCart);
    lc.addCart(newCart);
    res.status(200).json({ message: 'Cart agregadoooo', data: newCart });
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {

    if (req.params.cid ?? req.params.pid) {
        //const id = parseInt(req.params.cid, 10); // paresar cid si se utiliza con File System
        const cid = req.params.cid;
        const pid = req.params.pid;
        lc.addProductCart(pid, cid);
        res.status(201).json({ message: `Carrito con ID ${cid} Modificado. Se modificó la cantidad del Producto con Código ${pid}` });

    } else {

        res.status(201).json('Parámetros inválidos');
    }

});

cartsRouter.put('/', (req, res) => {
    if (req.query.id ?? req.query.codProd) {
        const id = req.query.id;
        const codProd = parseInt(req.query.codProd, 10);
        lc.addProductCart(codProd, id);
        res.status(201).json('Producto actualizado');

    } else {

        res.status(201).json('Parámetros inválidos');
    }

});


cartsRouter.put('/:cid/product/:pid', (req, res) => {

    if (req.params.cid ?? req.params.pid) {
        //const id = parseInt(req.params.cid, 10); // paresar cid si se utiliza con File System
        const cantidad = req.body.cantidad;
        const cid = req.params.cid;
        const pid = req.params.pid;
        lc.addProductCartCantidad(pid, cid, cantidad);
        res.status(201).json({ message: `Carrito con ID ${cid} Modificado. Se modificó la cantidad del Producto con Código ${pid}` });

    } else {

        res.status(201).json('Parámetros inválidos');
    }

});


cartsRouter.delete('/:cid/product/:pid', (req, res) => {

    if (req.params.cid ?? req.params.pid) {
        //const id = parseInt(req.params.cid, 10); // paresar cid si se utiliza con File System
        const cantidad = req.body.cantidad;
        const cid = req.params.cid;
        const pid = req.params.pid;
        lc.removeProductCart(pid, cid);
        res.status(201).json({ message: `Se eliminó del carrito con ID ${cid} el Producto con Código ${pid}` });

    } else {

        res.status(201).json('Parámetros inválidos');
    }

});


cartsRouter.delete('/:cid', (req, res) => {

    if (req.params.cid) {
        const cid = req.params.cid;
        lc.removeProductCartAll(cid);
        res.status(201).json({ message: `Se eliminaron todos los productos de carrito con ID ${cid}` });

    } else {

        res.status(201).json('Parámetros inválidos');
    }

});


export { cartsRouter };