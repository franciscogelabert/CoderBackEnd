import express from 'express';
import __dirname from '../utils.js';
import { productDAO } from '../dao/index.js';
import cookieParser from "cookie-parser";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { config } from '../config/config.js';
import ProductController from '../controllers/product.controller.js'
const productController = new ProductController();


const viewsRouter = express.Router();
const pDAO = new productDAO()


viewsRouter.use(cookieParser());

viewsRouter.use(
    session({
        secret: 'micAmbiArPoAlgoMasSeguro',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: config.mongo.URI,
            ttl: 2 * 60, // Tiempo de vida de la sesión en segundos (2 minutos en este caso)
        })
    }));


viewsRouter.get('/api/realTimeProducts', async (req, res) => {
    await productController.getProductsRealTime(req, res);
});

viewsRouter.get('/products', async (req, res) => {
    await productController.getPaginatedProducts(req, res);
});

viewsRouter.get('/product', async (req, res) => {
    await productController.getlimitProduct(req, res);
});

viewsRouter.post('/api', async (req, res) => {
    await productController.addSendProduct(req, res);
});

export { viewsRouter };