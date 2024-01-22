import { orderModel } from '../models/order.model.js';

class OrderDAO {
  constructor() {
    this.userId;
    this.cartId;
    this.quantity;
    this.totalPrice;
    this.orderDate;
    this.state;
  }
  createOrder = function (order) {
    return new Promise(async (resolve, reject) => {
      try {
        const newOrder = await orderModel.create(order);
        console.log('Order insertado:', newOrder);
        resolve(newOrder);

      } catch (error) {
        console.error('Error:', error);
        reject(error);
      }
    });
  }
}

export default OrderDAO;
