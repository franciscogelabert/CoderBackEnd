import Order from '../class/Order.js';
import { OrderRepository} from '../dao/Repository/index.js';
import { cartController} from '../controllers/index.js';

class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository(); // Puedes pasar los valores necesarios aquí si es necesario
  }

  async createOrderFromSocket(order) {
    try {
     const objOrder = new Order(order)
     const objCart = new cartController();
      const newOrder = await this.orderRepository.createOrder(objOrder);
    
      //actualiza el stock de los productos cuando persiste la orden

      objCart.updateStocksByIdCart(newOrder.cartId);
      return { newOrder };
    } catch (error) {
      console.error('Error en OrderController.createOrderFromSocket:', error);
    }
  }
 
}

export default OrderController;
