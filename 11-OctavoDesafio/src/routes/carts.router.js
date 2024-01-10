import express from 'express';
import __dirname from '../utils.js';
import { cartController } from '../controllers/index.js';;

const cartsRouter = express.Router();
const lcc= new cartController();

cartsRouter.get('/customer/:id', (req, res) => {
  lcc.renderCartPage(req, res);
});

cartsRouter.get('/', (req, res) => {
  lcc.getCartsList(req, res);
});

cartsRouter.get('/:id', (req, res) => {
  lcc.getCartById(req, res);
});

cartsRouter.post('/', (req, res) => {
  lcc.addNewCart(req, res);
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
  lcc.addProductToCart(req, res);
});

cartsRouter.put('/', (req, res) => {
  lcc.updateProductInCart(req, res);
});

cartsRouter.put('/:cid/product/:pid', (req, res) => {
  lcc.updateProductInCart(req, res);
});

cartsRouter.delete('/:cid/product/:pid', (req, res) => {
  lcc.removeProductFromCart(req, res);
});

cartsRouter.delete('/:cid', (req, res) => {
  lcc.removeAllProductsFromCart(req, res);
});

export { cartsRouter };