import express from 'express';
const usersRouter = express.Router();


// Ruta para manejar la solicitud de la página de inicio
usersRouter.get('/', (req, res) => {
    
    // Generar un índice aleatorio para seleccionar un usuario al azar
    let user = {
        name: "Francisco",
        lastName: "Gelabert"
    }
 
    // Renderizar la plantilla y pasar los datos del usuario
    res.render('index', { user });
});

export { usersRouter };