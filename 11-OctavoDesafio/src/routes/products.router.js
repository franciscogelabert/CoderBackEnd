import express from 'express';
import { productController  } from '../controllers/index.js';;
const productsRouter = express.Router();

const lpp = new productController();

productsRouter.get('/', async (req, res) => {
    await lpp.getAllProducts(req, res);
});

productsRouter.get('/:id', async (req, res) => {
    await lpp.getProductById(req, res);
});

productsRouter.get('/customer/:id', async (req, res) => {
    await lpp.getProductById(req, res);
});

productsRouter.post('/', async (req, res) => {
    await lpp.addProduct(req, res);
});

productsRouter.put('/:id', async (req, res) => {
    await lpp.updateProductById(req, res);
});

productsRouter.delete('/:id', async (req, res) => {
    await lpp.deleteProductById(req, res);
});

productsRouter.get('/code/:cod', async (req, res) => {
    await lpp.getProductByCode(req, res);
});

productsRouter.get('/customer/code/:cod', async (req, res) => {
    await lpp.getProductByCode(req, res);
});

export { productsRouter };