import express from 'express';
import ProductManager from '../../class/Product/ProductManager.js';

// Se puede importar elotro router ??

const usersRouter = express.Router();

const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/05-CuartoDesafio/files');
//const farchivo = new FileManager('productos.json', 'C:/Coderhouse/Backend/05-CuartoDesafio/files');


// creo el ProductManager
const lp = new ProductManager(farchivo);


// Ruta para manejar la solicitud de la página de inicio
usersRouter.get('/', (req, res) => {
    
    // Generar un índice aleatorio para seleccionar un usuario al azar
    let user = {
        name: "Francisco",
        lastName: "Gelabert",
        rol:"admin"
    }
 

    lp.getProducts()
        .then(() => {
            const limitQuery = req.query.limit;

            if (limitQuery) {

                const limitItems = lp.lista.slice(0, limitQuery);
                res.status(201).json(limitItems);

            } else {
                // Devolver a todos los usuarios si no se proporciona el query parameter
                res.status(201).json(lp.lista);
            }
        })
        .catch(error => {
            console.error('Error al cargar la lista de productos:', error);
        });

    // Renderizar la plantilla y pasar los datos del usuario
    res.render('index', { user });
});

export { usersRouter };