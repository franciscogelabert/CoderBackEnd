import express from 'express';
import __dirname from '../utils.js';
import CartController from '../controllers/cart.controller.js';

const cartsRouter = express.Router();

const cartController = new CartController();

cartsRouter.get('/customer/:id', (req, res) => {
  cartController.renderCartPage(req, res);
});

cartsRouter.get('/', (req, res) => {
  cartController.getCartsList(req, res);
});

cartsRouter.get('/:id', (req, res) => {
  cartController.getCartById(req, res);
});

cartsRouter.post('/', (req, res) => {
  cartController.addNewCart(req, res);
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
  cartController.addProductToCart(req, res);
});

cartsRouter.put('/', (req, res) => {
  cartController.updateProductInCart(req, res);
});

cartsRouter.put('/:cid/product/:pid', (req, res) => {
  cartController.updateProductInCart(req, res);
});

cartsRouter.delete('/:cid/product/:pid', (req, res) => {
  cartController.removeProductFromCart(req, res);
});

cartsRouter.delete('/:cid', (req, res) => {
  cartController.removeAllProductsFromCart(req, res);
});

export { cartsRouter };