import express from 'express';
import Product from '../../class/Product/Product.js';
import ProductManager from '../../class/Product/ProductManager.js';
import FileManager from '../../class/FileSystem/FileManager.js';

//const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/05-CuartoDesafio/files');
const farchivo = new FileManager('productos.json', 'C:/Coderhouse/Backend/05-CuartoDesafio/files');

 // creo el ProductManager
 const lp = new ProductManager(farchivo);

const viewsRouter = express.Router();

// Ruta para manejar la solicitud de la página de inicio
viewsRouter.get('/', (req, res) => {

    // Generar un índice aleatorio para seleccionar un usuario al azar
    let testUser = {
        name: "Francisco",
        lastName: "Gelabert",
        role: "admin"
    }

    // La lista de JSON proporcionada
    const jsonData = [{ "title": "Manzana", "description": "Fruta Manzana", "code": 1, "price": 500, "stock": 20, "thumbnail": ["url Manzana1", "url Manzana2"], "estado": true, "category": "Fruta" }, { "title": "Pera", "description": "Fruta Pera", "code": 2, "price": 600, "stock": 21, "thumbnail": ["url Pera1", "url Pera2"], "estado": true, "category": "Fruta" }, { "title": "Uva", "description": "Fruta Uva", "code": 3, "price": 700, "stock": 30, "thumbnail": ["url Uva1"], "estado": true, "category": "Fruta" }, { "title": "Banana", "description": "Fruta Banana", "code": 4, "price": 300, "stock": 31, "thumbnail": ["url Banana1", "url Banana2"], "estado": true, "category": "Fruta" }, { "title": "Kiwi", "description": "Fruta Kiwi", "code": 5, "price": 700, "stock": 40, "thumbnail": ["url Kiwi1", "url Kiwi2", "url Kiwi3"], "estado": true, "category": "Fruta" }, { "title": "Naranja", "description": "Fruta Naranja", "code": 6, "price": 800, "stock": 41, "thumbnail": [], "estado": true, "category": "Fruta" }, { "title": "Lechuga", "description": "Verdura Lechuga", "code": 7, "price": 300, "stock": 12, "thumbnail": ["url Lechuga1"], "estado": true, "category": "Verdura" }, { "title": "Acelga", "description": "Verdura Acelga", "code": 8, "price": 100, "stock": 13, "thumbnail": ["url Acelga1", "url Acelga2"], "estado": true, "category": "Verdura" }, { "title": "Rúcula", "description": "Verdura Rúcula", "code": 9, "price": 700, "stock": 15, "thumbnail": [], "estado": true, "category": "Verdura" }, { "title": "Rabanito", "description": "Verdura Rabanito", "code": 10, "price": 900, "stock": 8, "thumbnail": ["url Rabanito1", "url Rabanito2", "url Rabanito3"], "estado": true, "category": "Verdura" }, { "title": "Handler 4", "description": "Handler 4 desc", "code": "400", "price": "401", "stock": "402", "thumbnail": ["imagen 1", "imagen 2"], "estado": "true", "category": "HANDLER" }];

    // Almacenar los datos JSON en una lista común en JavaScript
    const food = jsonData.map(item => {
        return {
            title: item.title,
            description: item.description,
            code: item.code,
            price: item.price,
            stock: item.stock,
            thumbnail: item.thumbnail,
            estado: item.estado,
            category: item.category
        };
    });

   
    // Se puede importar elotro router ??

  lp.getProducts()
        .then((result) => {
            res.render('index', {
                user: testUser,
                style:'index.css',
                isAdmin: testUser.role === "admin", food: result //lp.lista
               
            });
        }).catch((error) => {
            console.error('Error:', error);
        });

});

viewsRouter.post('/', (req, res) => {
    let thumbnail=[];
    thumbnail.push(req.body.thumbnail1);
    thumbnail.push(req.body.thumbnail2);
    const newProduct = new Product(req.body.title, req.body.description, req.body.code, req.body.price, req.body.stock, thumbnail, req.body.estado, req.body.category);
    lp.addProduct(newProduct);
    res.status(201).json('Producto agregado');
});

export { viewsRouter };