import { OrderDAO } from '../index.js';

class OrderRepository {
  constructor() {
    this.orderDAO = new OrderDAO();
  }

  async createOrder(order) {
    try {
      const newOrder = await this.orderDAO.createOrder(order);
      return newOrder;
    } catch (error) {
      throw error;
    }
  }
  
}

export default OrderRepository;