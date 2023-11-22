import { viewsRouter } from './routes/views.router.js';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import Product from '../class/Product/Product.js';
import ProductManager from '../class/Product/ProductManager.js';
import ProductManagerDB from '../class/Product/ProductManagerDB.js';
import MessageManagerDB from '../class/Message/MessageManagerDB.js';
import FileManager from '../class/dao/FileSystem/FileManager.js';
import mongoose from 'mongoose';

// Configuración de la conexión a MongoDB
const URI = 'mongodb+srv://franciscogelabert:k6fNeJCfUJeOy77u@ecommerce.yssf83p.mongodb.net/ecommerce?retryWrites=true&w=majority';

mongoose.connect(URI)
    .then(() => {
        console.log('Base de datos lista para usarse');
    })
    .catch((err) => {
        console.log('Ha ocurrido un error --> ', err);
    });

// Configura Handlebars con opciones de tiempo de ejecución para que no muetsre un error de properties
const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
});

// Usando File Manager
//const farchivo = new FileManager('productos.json', `${__dirname}/files`);


// creo el ProductManager para FileSystem
//const lp = new ProductManager(farchivo);

// creo el ProductManager para Base de datos
const lp = new ProductManagerDB();
console.log('Paso 1 - Se crea el Product Manager en app.js');

// creo el ProductManager para Base de datos
const lm = new MessageManagerDB();
console.log('Paso 2 - Se crea el Message Manager en app.js');

// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de datos y la ruta

const app = express();
const port = 8080;


app.engine('handlebars', hbs.engine);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Conectar los routers a las rutas principales
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


const httpServer = app.listen(port, () => { console.log("Escuchando en Puerto: ", { port }) });
const socketServer = new Server(httpServer);


// inFO PARA chat

let messages = [{
    id: 1,
    text: "Hola Mundo",
    author: "Francisco"
}]

// Accesos al Servidor Alta y eliminación de Productos

socketServer.on('connection', socket => {

    console.log('Nuevo Cliente Conectado (Server 1)');

    socket.emit("messages", messages);

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
                // Manejo de errores, si la eliminación del producto falla
                // socketServer.emit("productDeletionError", error);
            });
        });

        socket.on('agregar_mensaje', (data) => {
            const mensaje = data;
            lm.addMessage(mensaje)
                .then(() => {
                    socketServer.emit("actualizarChat", mensaje);
                })
                .catch((error) => {
                    console.error("Error al agregar Mensajes:", error);
                    socket.emit("errorChat", mensaje);
                });
        });
 });
       
    export default socketServer;