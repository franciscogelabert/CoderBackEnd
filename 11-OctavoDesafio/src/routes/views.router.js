import express from 'express';
import __dirname from '../utils.js';
import { productModel } from '../models/index.js';
import { productDAO } from '../dao/index.js';
import cookieParser from "cookie-parser";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import mongoosePaginate from 'mongoose-paginate-v2';

// Configura dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtiene la cadena de conexión de MongoDB desde la variable de entorno
const URI = process.env.MONGODB_URI;
const viewsRouter = express.Router();
const pDAO= new productDAO()


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

// Para trabajar con la Base Mongo - ProductModel

viewsRouter.get('/api/realTimeProducts', async (req, res) => {
    try {
        const limitQuery = parseInt(req.query.limit);

        // Usar el DAO en lugar del modelo para obtener datos en tiempo real
        if (limitQuery) {
            const result = await pDAO.getProducts(); // Usa el método del DAO
            res.render('index', {
                layout: 'realTimeProducts',
                food: result.slice(0, limitQuery)
            });
        } else {
            const result = await pDAO.getProducts(); // Usa el método del DAO
            res.render('index', {
                layout: 'realTimeProducts',
                food: result
            });
        }

    } catch (error) {
        console.log("Error:  ", error);
    }
});



// Ruta para ver todos los datos de todos los productos sin paginar
viewsRouter.get('/products', async (req, res) => {
    try {

        const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
        const limitQuery = req.query.limit === undefined ? 10 : parseInt(req.query.limit);
        const sort = req.query.sort === 'ASC' ? 1 : -1;
        const category = req.query.category;
        const name = req.session.user.name;
        const _id = req.session.user._id;
        const rol = req.session.user.rol;
        const lastName = req.session.user.lastName;


        //http://localhost:8080/api/products?page=1&limit=2&category=Fruta&sort=DESC

    

        const result = await pDAO.getPaginatedProducts(page, limitQuery, sort, category);


        console.log("result", result);
        const prevLink = result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}&limit=${limitQuery}&category=${category}&sort=${sort === 1 ? 'ASC' : 'DESC'}` : null;
        const nextLink = result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}&limit=${limitQuery}&category=${category}&sort=${sort === 1 ? 'ASC' : 'DESC'}` : null;

        res.render('index', {
            layout: 'products',
            _id: _id,
            rol: rol,
            name: name,
            lastName: lastName,
            food: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink
        });

      
    }
    catch (error) {
        console.log("Error:  ", error);
    }
})


viewsRouter.get('/product', async (req, res) => {
    try {
        const limitQuery = parseInt(req.query.limit);
    
        let result = limitQuery ? await pDAO.getProducts().limit(limitQuery) : await pDAO.getProducts();

        res.render('index', {
            layout: 'home',
            food: result
        });
    } catch (error) {
        console.log("Error:  ", error);
    }
});


// Ruta para realizar un Post desde Postman 
viewsRouter.post('/api', async (req, res) => {
    try {
        const newProduct = {
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            price: req.body.price,
            stock: req.body.stock,
            thumbnail: req.body.thumbnail,
            estado: req.body.estado,
            category: req.body.category
        };

        // Utiliza el método de DAO para agregar el nuevo producto
        const result = await pDAO.addProduct(newProduct);
        res.send({ result: 'success', payload: result });
        console.log("Post -> DAO");
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).send({ result: 'error', message: 'Error al insertar el producto en la base de datos' });
    }
});

export { viewsRouter };