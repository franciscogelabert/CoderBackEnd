
import { cartsRouter } from './routes/carts.router.js';
import { productsRouter } from './routes/products.router.js';
import { viewsRouter } from './routes/views.router.js';
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => { console.log("Escuchando en Puerto: ", { port }) });
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => { console.log('Nuevo Cliente Conectado (Server 1)') });
socketServer.on('message', data => { console.log(data)});

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Conectar los routers a las rutas principales
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/users', viewsRouter);



