import { viewsRouter } from './routes/views.router.js';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import Product from '../class/Product/Product.js';
import ProductManager from '../class/Product/ProductManager.js';
import FileManager from '../class/dao/FileSystem/FileManager.js';

import {connect} from '../src/db/connect.js';


// Usando Base de datos en Mongo




// Configura Handlebars con opciones de tiempo de ejecución para que no muetsre un error de properties
const hbs = handlebars.create({
   runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});



// Usando File Manager
const farchivo = new FileManager('productos.json', `${__dirname}/files`);


// creo el ProductManager
const lp = new ProductManager(farchivo);
// hacer un lpDB = new ProductManager();

console.log('Paso 1 - Se crea el Product Manager');

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


// Accesos al Servidor Alta y eliminación de Productos

socketServer.on('connection', socket => {
    console.log('Nuevo Cliente Conectado (Server 1)')

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
                    
                    /*  TODO !!!*/

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

        /*  TODO  */

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

});

export default socketServer;