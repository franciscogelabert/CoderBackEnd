/*  Server  */

import ProductManager from '../class/Product/ProductManager.js';
import FileManager from '../class/FileSystem/FileManager.js';
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


// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de datos y la ruta


const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/04-PrimeraEntrega');
//const farchivo = new FileManager('productos.json', 'C:/Coderhouse/Backend/04-PrimeraEntrega');


// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 1 - Se crea el Product Manager');

/*
app.get('/products', (req, res) => {
    lp.getProducts()
        .then(() => {
            const limitQuery = req.query.limit;

            if (limitQuery) {

                const limitItems = lp.lista.slice(0, limitQuery);
                res.send(limitItems);

            } else {
                // Devolver a todos los usuarios si no se proporciona el query parameter
                res.send(lp.lista);
            }
        })
        .catch(error => {
            console.error('Error al cargar la lista de productos:', error);
        });
})*/

app.get('/products/:id', (req, res) => {
    
    const id = req.params.id; 

    lp.getProductById(id)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            console.error('Error:', error);
        });
})

app.get('/products/code/:cod', (req, res) => {
    const cod = req.params.cod;

    lp.getProductByCode(cod)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            console.error('Error:', error);
        });
})

app.listen(port, () => { console.log("Escuchando en Puerto: ", { port }) })



/*
    
    Rutas
    /products
    /carts


    Router ---->     /api/products/

    - GET / ---> deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
    - GET /:pid ----> deberá traer sólo el producto con el id proporcionado
    - POST / deberá agregar un nuevo producto con los campos:
            -id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.
            -title:String,
            -description:String
            -code:String
            -price:Number
            -status:Boolean
            -stock:Number
            -category:String
            -thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
        Status es true por defecto.
        Todos los campos son obligatorios, a excepción de thumbnails

    - PUT /:pid ---> deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
    - DELETE /:pid ---> deberá eliminar el producto con el pid indicado. 

    Router ---->     /api/carts/

    - POST / deberá crear un nuevo carrito con la siguiente estructura:
             - Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
             - products: Array que contendrá objetos que representen cada producto
    - GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
    - POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
              -Id_product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
            -  quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
    Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 

    
    */ 

