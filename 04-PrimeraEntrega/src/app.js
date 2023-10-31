/*  Server  */

import { cartsRouter } from './routes/carts.router.js';
import { productsRouter } from './routes/products.router.js';
import express from 'express';


const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Conectar los routers a las rutas principales
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(port, () => { console.log("Escuchando en Puerto: ", { port }) })

