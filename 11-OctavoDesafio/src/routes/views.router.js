import express from 'express';
import __dirname from '../utils.js';
import { productModel } from '../../class/Dao/MongoDB/models/product.model.js';
import cookieParser from "cookie-parser";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

// Configura dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtiene la cadena de conexión de MongoDB desde la variable de entorno
const URI = process.env.MONGODB_URI;


const viewsRouter = express.Router();


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

        const limitQuery = parseInt(req.query.limit)

        if (limitQuery) {
            let result = await productModel.find().limit(limitQuery);
            res.render('index', {
                layout: 'realTimeProducts',
                food: result
            });

        } else {
            let result = await productModel.find();
            res.render('index', {
                layout: 'realTimeProducts',
                food: result

            });
        }

    }
    catch (error) {
        console.log("Error:  ", error);
    }
})


// Ruta para ver todos los datos de todos los productos sin paginar
viewsRouter.get('/api/aggregate', async (req, res) => {
    try {

        const limitQuery = req.query.limit === undefined ? 10 : parseInt(req.query.limit);
        const sort = req.query.sort === 'ASC' ? 1 : -1;
        let state = false;
        let estado = "";
        const page = req.query.page;
        const category = req.query.category;


        console.log("limitQuery", limitQuery);
        console.log("category", category);
        console.log("sort", sort);

        //http://localhost:8080/api?limit=2&category=Fruta&sort=Desc


        let result = await productModel.aggregate([
            {
                $match: {
                    category: category
                }
            },
            {
                $group: {
                    _id: "$title",
                    totalQuantity: {
                        $sum: {
                            $multiply: ["$price", "$stock"]
                        }
                    },
                    doc: {
                        $first: "$$ROOT"
                    }
                }
            },
            {
                $sort: {
                    totalQuantity: sort,
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$doc", { totalQuantity: "$totalQuantity" }]
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    totalQuantity: 1,
                    title: "$title",
                    category: "$category"
                }
            }
        ]).limit(limitQuery);

        console.log("result ----> ", result);

        state = await productModel.find().limit(limitQuery).explain("executionStats");

        if (state.executionStats.executionSuccess) {
            estado = "success";
        } else {
            estado = "error";
        }

        res.render('index', {
            layout: 'home',
            food: result,
            status: estado
        });



    }
    catch (error) {
        console.log("Error:  ", error);
    }
})


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

        const options = {
            page: page, // Página actual
            limit: limitQuery,
            sort: { price: sort }, // Ordenar por totalQuantity
            lean: true
        };
        const query = {}; // Inicializar la consulta vacía

        // Agregar filtro por categoría si se proporciona
        if (category) {
            query.category = category;
        }

        console.log("page", page);
        console.log("limitQuery", limitQuery);
        console.log("category", category);
        console.log("sort", sort);


        //http://localhost:8080/api/products?page=1&limit=2&category=Fruta&sort=DESC



        const result = await productModel.paginate(query, options);

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

        //res.cookie("totalPages", result.totalPages, { maxAge: 10000 });

    }
    catch (error) {
        console.log("Error:  ", error);
    }
})


// Ruta para ver datos de los productos para agregar al carrito
viewsRouter.get('/product', async (req, res) => {
    try {

        const limitQuery = parseInt(req.query.limit)

        if (limitQuery) {
            let result = await productModel.find().limit(limitQuery);
            res.render('index', {
                layout: 'home',
                food: result
            });

        } else {
            let result = await productModel.find();
            res.render('index', {
                layout: 'home',
                food: result

            });
        }

    }
    catch (error) {
        console.log("Error:  ", error);
    }
})


// Ruta para realizar un Post desde Postman 
viewsRouter.post('/api', async (req, res) => {
    try {

        const newProduct = new productModel({
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            price: req.body.price,
            stock: req.body.stock,
            thumbnail: req.body.thumbnail,
            estado: req.body.estado,
            category: req.body.category
        });
        // Guarda el nuevo producto en la base de datos
        const result = await newProduct.save();
        res.send({ result: 'success', payload: result });
        console.log("Post -> DB");
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).send({ result: 'error', message: 'Error al insertar el producto en la base de datos' });
    }
});


export { viewsRouter };