
import { cartsRouter } from './routes/carts.router.js';
import { productsRouter } from './routes/products.router.js';
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



// Ruta para manejar la solicitud de la página de inicio
app.get('/', (req, res) => {
    
    // Generar un índice aleatorio para seleccionar un usuario al azar
    let user = {
        name: "Francisco",
        lastName: "Gelabert"
    }
 
    // Renderizar la plantilla y pasar los datos del usuario
    res.render('index', { user });
});


app.listen(port, () => { console.log("Escuchando en Puerto: ", { port }) })

