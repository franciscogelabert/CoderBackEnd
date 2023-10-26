import express from 'express';
const cartsRouter = express.Router();

// Array para almacenar mascotas
const carts = [];

// Ruta raíz para obtener mascotas
cartsRouter.get('/', (req, res) => {
    res.status(200).json(carts);
});

// Ruta raíz para agregar una mascota
cartsRouter.post('/', (req, res) => {
    const newCart = req.body;
    carts.push(newCart);
    res.status(201).json(carts);
});

export { cartsRouter };