import CartDAO from '../dao/cartDAO.js';

class CartController {
  constructor() {
    this.cartDAO = new CartDAO();
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

      if (!cartDetails) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }

      res.send(cartDetails);

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
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