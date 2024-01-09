// product.controller.js

import ProductDAO from '../dao/productDAO.js';

class ProductController {
  constructor() {
    this.productDAO = new ProductDAO();
  }

  async getAllProducts(req, res) {
    try {
      const limitQuery = req.query.limit;
 
      const products = await this.productDAO.getProducts();
      const limitedProducts = limitQuery ? products.slice(0, limitQuery) : products;

      res.status(200).json(limitedProducts);
    } catch (error) {
      console.error('Error al cargar la lista de productos:', error);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  }

  async getProductById(req, res) {
    const id = req.params.id;

    try {
      const product = await this.productDAO.getProductById(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      res.status(500).json({ error: 'Error al obtener producto por ID' });
    }
  }

  async getProductByCode(req, res) {
    const code = req.params.cod;

    try {
      const product = await this.productDAO.getProductByCode(code);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener producto por código:', error);
      res.status(500).json({ error: 'Error al obtener producto por código' });
    }
  }

  async addProduct(req, res) {
    const { title, description, code, price, stock, thumbnail, estado, category } = req.body;

    try {
      const newProduct = await this.productDAO.addProduct({ title, description, code, price, stock, thumbnail, estado, category });
      res.status(201).json({ message: 'Producto agregado', product: newProduct });
    } catch (error) {
      console.error('Error al agregar producto:', error);
      res.status(500).json({ error: 'Error al agregar producto' });
    }
  }

  async updateProductById(req, res) {
    const id = req.params.id;
    const updatedProductData = req.body;

    try {
      const success = await this.productDAO.updateProductById(id, updatedProductData);
      if (success) {
        res.status(200).json({ message: `Producto con ID ${id} actualizado` });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  }

  async deleteProductById(req, res) {
    const id = req.params.id;

    try {
      const success = await this.productDAO.deleteProductById(id);
      if (success) {
        res.status(200).json({ message: `Producto con ID ${id} eliminado` });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  }
}

export default ProductController;