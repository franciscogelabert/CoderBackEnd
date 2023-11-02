
import { cartsRouter } from './routes/carts.router.js';
import { productsRouter } from './routes/products.router.js';
import { usersRouter } from './routes/users.router.js';
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

const app = express();
const port = 8080;

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));



app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Conectar los routers a las rutas principales
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/users', usersRouter);






app.listen(port, () => { console.log("Escuchando en Puerto: ", { port }) })

