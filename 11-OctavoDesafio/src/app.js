import { viewsRouter } from './routes/views.router.js';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { login } from './routes/login.router.js';
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import { db } from './db/connect.js';
import Product from '../class/Product/Product.js';
import ProductManagerDB from '../class/Product/ProductManagerDB.js';
import CartManagerDB from '../class/Cart/CartManagerDB.js';
import Cart from '../class/Cart/Cart.js';
import cookieParser from 'cookie-parser';



// Configura Handlebars con opciones de tiempo de ejecución para que no muetsre un error de properties
const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
});

// Registrar un ayudante personalizado para la multiplicación
hbs.handlebars.registerHelper('multiply', function (a, b) {
    return a * b;
});


// creo el ProductManagerDB para Base de datos
const lp = new ProductManagerDB();

// creo el ProductManagerDB para Base de datos
const lc = new CartManagerDB();


// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de datos y la ruta

const app = express();
const port = 8080;

// Middleware CookieParser
app.use(cookieParser());

app.engine('handlebars', hbs.engine);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// Conectar los routers a las rutas principales

app.use('/', login);
app.use('/api', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


const httpServer = app.listen(port, () => { console.log("Escuchando en Puerto: ", { port }) });
const socketServer = new Server(httpServer);


// Accesos al Servidor

socketServer.on('connection', socket => {
    console.log('Nuevo Cliente Conectado (Server 1)');
    socket.on('agregar_producto', (data) => {
        lp.seEncuentra(data.code)
            .then((result) => {
                console.log("Proceso de Agregado", result);
                if (result === false) {
                    const thumbnail = [];
                    thumbnail.push(data.thumbnail1);
                    thumbnail.push(data.thumbnail2);
                    const intCode = parseInt(data.code, 10);
                    const intPrice = parseInt(data.price, 10);
                    const intStock = parseInt(data.stock, 10);
                    const newProduct = new Product(data.title, data.description, intCode, intPrice, intStock, thumbnail, data.estado, data.category);

                    lp.addProduct(newProduct);

                    socketServer.emit("productAdded", newProduct)
                } else {
                    socket.emit("productNotAdded", data.code);
                }
            })
            .catch((error) => {
                console.error("Error al insertar:", error);
                // Manejo de errores, si la eliminación del producto falla
                // socketServer.emit("productDeletionError", error);
            });
    });


    socket.on('eliminar_producto', (data) => {
        const cProd = data;
        lp.deleteProductByCode(cProd)
            .then((result) => {
                console.log("Proceso de Eliminado");
                if (result === true) {
                    // Si result es true, el producto se eliminó
                    socket.emit("productDeleted", cProd);
                } else {
                    socket.emit("productNotDeleted", cProd);
                }
            })
            .catch((error) => {
                console.error("Error al eliminar producto:", error);
            });
    });


    ///////// Cart Sockets ////////////////////

    socket.on('crear_carrito', (codigoProducto, usuario) => {

        // Obtener el ID en Base del Producto seleccionado por codigo

        lp.getProductByCode(codigoProducto)
            .then((result) => {
                const info = {
                    "IdUser": usuario,
                    "lista": [
                        {
                            "IdProd": result[0]._id,
                            "CantProd": 1
                        }
                    ]
                };

                //const productId = data;
                const newCart = new Cart(info);

                // Devolver la promesa para poder encadenarla
                lc.addCart(newCart)
                    .then((cartId) => {
                        socket.emit("carritoCreado", cartId, result[0].price);
                    })
                    .catch((error) => {
                        console.error("Error al agregar carrito:", error);
                        socket.emit("Error Carrito", mensaje);
                    });
            })
            .catch((error) => {
                console.error("Error al Crear el Carrito: ", error);
                socket.emit("Error al Crear el Carrito");
            });
    });


    socket.on('agregar_producto_carrito', (codigoProducto, carrito) => {

        // Obtener el ID en Base del Producto seleccionado por codigo
        lp.getProductByCode(codigoProducto)
            .then((result) => {

                lc.addProductCart(result[0]._id, carrito)
                    .then((cartId) => {
                        console.log("carritoActualizado --->", carrito);
                        socket.emit("carritoActualizado", result[0].price);

                    });
            })
            .catch((error) => {
                console.error("Error al Crear el Carrito: ", error);
                socket.emit("Error al Crear el Carrito");
            });
    });


    socket.on('eliminar_producto_carrito', (idProducto, idCarrito) => {

        // Obtener el ID en Base del Producto seleccionado por codigo
        lc.removeProductCart(idProducto, idCarrito)
            .then((result) => {
                console.log("carritoActualizado --->", idCarrito);
                socket.emit("carritoActualizado", idCarrito)
            })
            .catch((error) => {
                console.error("Error al Crear el Carrito: ", error);
                socket.emit("Error al Crear el Carrito");
            });
    });


});

export default socketServer;