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



      const result = await this.productDAO.getPaginatedProducts(page, limitQuery, sort, category);


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
        const result = await this.productDAO.getProducts(); // Usa el método del DAO
        res.render('index', {
          layout: 'realTimeProducts',
          food: result.slice(0, limitQuery)
        });
      } else {
        const result = await this.productDAO.getProducts(); // Usa el método del DAO
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

      let result = limitQuery ? await pDAO.getProducts().limit(limitQuery) : await pDAO.getProducts();

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
 

}

export default ProductController;