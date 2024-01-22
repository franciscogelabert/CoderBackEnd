import { cartDAO } from '../index.js';

class CartRepository {
  constructor() {
    this.cartDAO = new cartDAO();
  }

  async addCart(cart) {
    try {
      return await this.cartDAO.addCart(cart);
    } catch (error) {
      throw error;
    }
  }

  async getCartsByUserId(idUser) {
    try {
      return await this.cartDAO.getCartsByUserId(idUser);
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(idProduct, idCart) {
    try {
      return await this.cartDAO.addProductCart(idProduct, idCart);
    } catch (error) {
      throw error;
    }
  }

  async addProductToCartWithQuantity(idProduct, idCart, quantity) {
    try {
      return await this.cartDAO.addProductCartCantidad(idProduct, idCart, quantity);
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromCart(idProduct, idCart) {
    try {
      return await this.cartDAO.removeProductCart(idProduct, idCart);
    } catch (error) {
      throw error;
    }
  }

  async removeAllProductsFromCart(idCart) {
    try {
      return await this.cartDAO.removeProductCartAll(idCart);
    } catch (error) {
      throw error;
    }
  }

  async getCarts() {
    try {
      return await this.cartDAO.getCarts();
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      return await this.cartDAO.getCartById(id);
    } catch (error) {
      throw error;
    }
  }

  async getTotalsCartById(id) {
    try {
      return await this.cartDAO.getTotalesCartById(id);
    } catch (error) {
      throw error;
    }
  }
}

export default CartRepository;
