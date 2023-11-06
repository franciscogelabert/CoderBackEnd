import { viewsRouter } from './routes/views.router.js';
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';

import Product from '../class/Product/Product.js';
import ProductManager from '../class/Product/ProductManager.js';
import FileManager from '../class/FileSystem/FileManager.js';


const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/05-CuartoDesafio/files');
//const farchivo = new FileManager('productos.json', 'C:/Coderhouse/Backend/05-CuartoDesafio/files');


// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 1 - Se crea el Product Manager');

// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de datos y la ruta


const app = express();
const port = 8080;

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Conectar los routers a las rutas principales
app.use('/', viewsRouter);


const httpServer = app.listen(port, () => { console.log("Escuchando en Puerto: ", { port }) });
const socketServer = new Server(httpServer);


///////////////////////Añadir unelemento///////////////

socketServer.on('connection', socket => {
    console.log('Nuevo Cliente Conectado (Server 1)')

    socket.on('agregar_producto', (data) => {
        console.log("Proceso de Agregado");
        const thumbnail = [];
        thumbnail.push(data.thumbnail1);
        thumbnail.push(data.thumbnail2);
        const newProduct = new Product(data.title, data.description, data.code, data.price, data.stock, thumbnail, data.estado, data.category);
        lp.addProduct(newProduct);
        socketServer.emit("productAdded", newProduct)
    });

    socket.on('eliminar_producto', (data) => {
        const cProd=data;
        lp.deleteProductByCode(cProd);
        console.log("Proceso de Eliminado");
        socketServer.emit("productDeleted", cProd)
    });


});



export default socketServer;