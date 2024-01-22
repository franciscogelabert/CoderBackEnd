// product.controller.js

import { ProductRepository } from '../dao/Repository/index.js';

class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const limitQuery = req.query.limit;

      const products = await this.productRepository.getProducts();
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
      const product = await this.productRepository.getProductById(id);
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


  async getProductsByCode(code) {
    try {
      const result = await this.productRepository.getProductByCode(code);

      console.log("result--> ", result);
      return result;
    } catch (error) {
      console.error('Error en ProductController.getProductByCode:', error);
      throw error;
    }
  };

  async getProductByCode(req, res) {
    const code = req.params.cod;

    try {
      const product = await this.productRepository.getProductByCode(code);
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
      const newProduct = await this.productRepository.addProduct({ title, description, code, price, stock, thumbnail, estado, category });
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
      const success = await this.productRepository.updateProductById(id, updatedProductData);
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
      const success = await this.productRepository.deleteProductById(id);
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


  async getPaginatedProducts(req, res) {

    try {

      const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
      const limitQuery = req.query.limit === undefined ? 10 : parseInt(req.query.limit);
      const sort = req.query.sort === 'ASC' ? 1 : -1;
      const category = req.query.category;
      const name = req.session.user.name;
      const _id = req.session.user._id;
      const rol = req.session.user.rol;
      const lastName = req.session.user.lastName;


      //http://localhost:8080/api/products?page=1&limit=2&category=Fruta&sort=DESC



      const result = await this.productRepository.getPaginatedProducts(page, limitQuery, sort, category);


      console.log("result", result);
      const prevLink = result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}&limit=${limitQuery}&category=${category}&sort=${sort === 1 ? 'ASC' : 'DESC'}` : null;
      const nextLink = result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}&limit=${limitQuery}&category=${category}&sort=${sort === 1 ? 'ASC' : 'DESC'}` : null;

      res.render('index', {
        layout: 'products',
        _id: _id,
        rol: rol,
        name: name,
        lastName: lastName,
        food: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: prevLink,
        nextLink: nextLink
      });
    }
    catch (error) {
      console.log("Error:  ", error);
    }
  }


  async getProductsRealTime(req, res) {
    try {
      const limitQuery = parseInt(req.query.limit);

      // Usar el DAO en lugar del modelo para obtener datos en tiempo real
      if (limitQuery) {
        const result = await this.productRepository.getProducts(); // Usa el método del DAO
        res.render('index', {
          layout: 'realTimeProducts',
          food: result.slice(0, limitQuery)
        });
      } else {
        const result = await this.productRepository.getProducts(); // Usa el método del DAO
        res.render('index', {
          layout: 'realTimeProducts',
          food: result
        });
      }

    } catch (error) {
      console.log("Error:  ", error);
    }
  };

  async getlimitProduct(req, res) {
    try {
      const limitQuery = parseInt(req.query.limit);

      let result = limitQuery ? await this.productRepository.getProducts().limit(limitQuery) : await pDAO.getProducts();

      res.render('index', {
        layout: 'home',
        food: result
      });
    } catch (error) {
      console.log("Error:  ", error);
    }
  };

  // Ruta para realizar un Post desde Postman 
  async addSendProduct(req, res) {
    try {
      const newProduct = {
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        stock: req.body.stock,
        thumbnail: req.body.thumbnail,
        estado: req.body.estado,
        category: req.body.category
      };

      // Utiliza el método de DAO para agregar el nuevo producto
      const result = await pDAO.addProduct(newProduct);
      res.send({ result: 'success', payload: result });
      console.log("Post -> DAO");
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).send({ result: 'error', message: 'Error al insertar el producto en la base de datos' });
    }
  };

  async socketAddProduct(req, res) {
    try {

    } catch (error) {
      console.log("Error: ", error);
      res.status(500).send({ result: 'error', message: 'Error al insertar el producto en la base de datos' });
    }
  };


  async seEncuentra(codigo) {
    try {
      const result = await this.productRepository.seEncuentra(codigo);

      if (result.length > 0) {
        return result;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error en ProductController.seEncuentra:', error);
      throw error;
    }
  }

  async deleteProductByCode(codigo) {
    try {
      const resultado = await this.productRepository.deleteProductByCode(codigo);

      if (resultado === true) {
        console.log('Producto eliminado correctamente.');
        return true;
      } else {
        console.log('Producto a Eliminar no encontrado.');
        return false;
      }
    } catch (error) {
      console.error('Error en ProductController.deleteProductByCode:', error);
      throw error;
    }
  }

  async decrementStockById(idProducto, cantidad) {

    try {
      const success = await this.productRepository.decrementStockById(idProducto, cantidad);
      if (success) {
        console.log('Stock del producto con ID ${id} decrementado');
        return true;
      } else {
        console.log('Producto no encontrado o no hay suficiente stock');
        return false;
      }
    } catch (error) {
      console.error('Error al decrementar el stock:', error);
      return false;
    }
  }
  async isStockAvailable(id) {
    try {


      if (!id) {
        return res.status(400).json({ error: 'Parámetros inválidos' });
      }

      const isAvailable = await this.productRepository.isStockAvailable(id);

      return isAvailable;
    } catch (error) {
      console.error('Error:', error);

      console.log('Error interno del servidor');
      return false;
    }
  }


}

export default ProductController;