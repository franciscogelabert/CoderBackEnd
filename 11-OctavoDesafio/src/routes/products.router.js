import express from 'express';
import ProductController from '../controllers/product.controller.js'
const productsRouter = express.Router();
const productController = new ProductController();

productsRouter.get('/', async (req, res) => {
    await productController.getAllProducts(req, res);
});

productsRouter.get('/:id', async (req, res) => {
    await productController.getProductById(req, res);
});

productsRouter.get('/customer/:id', async (req, res) => {
    await productController.getProductByCustomerId(req, res);
});

productsRouter.post('/', async (req, res) => {
    await productController.addProduct(req, res);
});

productsRouter.put('/:id', async (req, res) => {
    await productController.updateProductById(req, res);
});

productsRouter.delete('/:id', async (req, res) => {
    await productController.deleteProductById(req, res);
});

productsRouter.get('/code/:cod', async (req, res) => {
    await productController.getProductByCode(req, res);
});

productsRouter.get('/customer/code/:cod', async (req, res) => {
    await productController.getProductByCode(req, res);
});

export { productsRouter };