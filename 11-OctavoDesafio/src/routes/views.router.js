import express from 'express';
import __dirname from '../utils.js';
import { productDAO } from '../dao/index.js';
import cookieParser from "cookie-parser";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import ProductController from '../controllers/product.controller.js'
const productController = new ProductController();

// Configura dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtiene la cadena de conexión de MongoDB desde la variable de entorno
const URI = process.env.MONGODB_URI;
const viewsRouter = express.Router();
const pDAO = new productDAO()


viewsRouter.use(cookieParser());

viewsRouter.use(
    session({
        secret: 'micAmbiArPoAlgoMasSeguro',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: URI,
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