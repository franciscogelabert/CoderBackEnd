import express from 'express';
const productsRouter = express.Router();

// Array para almacenar mascotas
const products = [];

// Ruta raíz para obtener mascotas
productsRouter.get('/', (req, res) => {
    res.status(200).json(products);
});

// Ruta raíz para agregar una mascota
productsRouter.post('/', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

export { productsRouter };