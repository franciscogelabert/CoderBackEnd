import { viewsRouter } from './routes/views.router.js';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { login } from './routes/login.router.js';
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import cookieParser from 'cookie-parser';
import { configureSocketServer } from '../src/socket/socketManager.js';

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

const httpServer = app.listen(port, () => {
    console.log("Escuchando en Puerto: ", { port });
});

const socketServer = configureSocketServer(httpServer);

export default socketServer;


