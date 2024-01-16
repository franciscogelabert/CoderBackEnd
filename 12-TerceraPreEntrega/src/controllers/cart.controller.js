import CartDAO from '../dao/cartDAO.js';
import Cart from '../class/Cart.js';
import { productController } from '../controllers/index.js';;

class CartController {
  constructor() {
    this.cartDAO = new CartDAO();
  }

  async createCartFromSocket(codigoProducto, usuario) {
    try {
      const lpc = new productController();
      const product = await lpc.getProductsByCode(codigoProducto);

      if (product) {
        const cartInfo = {
          "IdUser": usuario,
          "lista": [
            {
              "IdProd": product[0]._id,
              "CantProd": 1
            }
          ]
        };

        const newCart = new Cart(cartInfo);
        const cartId = await this.addNewCart(newCart);


        return { cartId, price: product[0].price };


      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error('Error en CartController.createCartFromSocket:', error);
      throw error;
    }
  }

  async getCartsByUserId(req, res) {
    try {
      const idUser = req.params.id;

      if (!idUser) {
        return res.status(400).json({ error: 'Parámetros inválidos' });
      }

      const userCarts = await this.cartDAO.getCartsByUserId(idUser);

      if (!userCarts || userCarts.length === 0) {
        return res.status(404).json({ error: 'No se encontraron carritos para el usuario especificado' });
      }

      res.status(200).json(userCarts);

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }


  async renderCartPage(req, res) {
    try {
      const id = req.params.id;
      const cartDetails = await this.cartDAO.getCartById(id);

      if (!cartDetails) {
        // Manejar el caso en el que no se encuentre el carrito
        return res.status(404).render('error', {
          message: 'Carrito no encontrado',
          error: { status: 404, stack: '...' } // Puedes personalizar el objeto de error según tus necesidades
        });
      }

      res.render('index', {
        layout: 'carts',
        itemCart: cartDetails.lista,
        IdUser: cartDetails.IdUser,
        IdCart: id,
        cantProd: cartDetails.cantProd,
        precioTotal: cartDetails.precioTotal
      });

    } catch (error) {
      console.error('Error:', error);
      // Manejar el error de manera adecuada según tus necesidades
      res.status(500).render('error', {
        message: 'Error interno del servidor',
        error: { status: 500, stack: '...' } // Puedes personalizar el objeto de error según tus necesidades
      });
    }
  }

  async addProductCart(idProduct, idCart) {
    try {
      const result = await this.cartDAO.addProductCart(idProduct, idCart);
      return result;
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      throw new Error('Error al agregar producto al carrito');
    }
  }

  async getCartsList(req, res) {
    try {
      const cartsList = await this.cartDAO.getCarts();

      res.send(cartsList);

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async getCartById(req, res) {
    try {
      const id = req.params.id;
      const cartDetails = await this.cartDAO.getCartsById(id);
      const userAutenticado = req.session.user._id.toString(); // Convertir a string
      const userCarrito = cartDetails.IdUser.toString(); // Convertir a string

      if (!cartDetails) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      } else if (!userAutenticado) {
        return res.status(403).send({ status: "Error", error: "Usuario no Autorizado para consultar los datos del carrito" });
      }

      console.log("userAutenticado", userAutenticado);
      console.log("userCarrito", userCarrito);

      if (userAutenticado === userCarrito) {
        res.send(cartDetails);
      } else {
        // Manejar otros roles si es necesario
        res.status(403).send({ status: "Error", error: "Usuario no Autorizado para consultar los datos del carrito" });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Debe estar autenticado para continuar' });
    }
  }

  async addNewCart(cart) {
    try {
      const newCart = await this.cartDAO.addCart(cart);
      return newCart;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error interno del servidor');
    }
  }



  async addProductToCart(req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;

      if (cid && pid) {
        await this.cartDAO.addProductCart(pid, cid);
        res.status(201).json({ message: `Carrito con ID ${cid} Modificado. Se modificó la cantidad del Producto con Código ${pid}` });
      } else {
        res.status(400).json('Parámetros inválidos');
      }

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async updateProductInCart(req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;

      if (cid && pid) {
        const cantidad = req.body.cantidad;
        await this.cartDAO.addProductCartCantidad(pid, cid, cantidad);
        res.status(201).json({ message: `Carrito con ID ${cid} Modificado. Se modificó la cantidad del Producto con Código ${pid}` });
      } else {
        res.status(400).json('Parámetros inválidos');
      }

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async removeProductCart(idProduct, idCart) {
    try {
      const result = await this.cartDAO.removeProductCart(idProduct, idCart);
      return result;
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      throw new Error('Error al eliminar producto del carrito');
    }
  }
  async removeProductFromCart(req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;

      if (cid && pid) {
        await this.cartDAO.removeProductCart(pid, cid);
        res.status(201).json({ message: `Se eliminó del carrito con ID ${cid} el Producto con Código ${pid}` });
      } else {
        res.status(400).json('Parámetros inválidos');
      }

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async removeAllProductsFromCart(req, res) {
    try {
      const cid = req.params.cid;

      if (cid) {
        await this.cartDAO.removeProductCartAll(cid);
        res.status(201).json({ message: `Se eliminaron todos los productos de carrito con ID ${cid}` });
      } else {
        res.status(400).json('Parámetros inválidos');
      }

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

}




export default CartController;