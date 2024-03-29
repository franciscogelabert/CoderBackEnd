import express from 'express';
import __dirname from '../utils.js';

import cookieParser from "cookie-parser";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { config } from '../config/config.js';

import MessageController from '../controllers/message.controller.js'
import ProductController from '../controllers/product.controller.js'

const productController = new ProductController();
const messageController = new MessageController();


const viewsRouter = express.Router();

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

    const user = req.session.user;

    if (user.rol === "admin") {
        // Redirige a la URL para admin
        await productController.getProductsRealTime(req, res);
    } else {
        // Manejar otros roles si es necesario
        res.status(403).send({ status: "Error", error: "Usuario no Autorizado debe ser Admin para gestionar los datos del Producto" });
    }
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


// API Chat
viewsRouter.get('/chat', async (req, res) => {
    try {
        const messages = await messageController.getMessages();
        const user = req.session.user;
        const name = user.name;
        const _id = user._id;
        const rol = user.rol;
        const lastName = user.lastName;

        if (user.rol === "usuario") {
            res.render('index', {
                layout: 'chat',
                message: messages,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                _id: user._id,
                rol: user.rol
            });
        } else {
          
            res.status(403).send({ status: "Error", error: "Usuario no Autorizado para acceder al Chat el mismo debe poseer los permisos de Usuario" });
        }
    } catch (error) {
        console.log("Error:  ", error);
        
        res.render('error', { error: 'Error interno del servidor' });
    }
});

export { viewsRouter };