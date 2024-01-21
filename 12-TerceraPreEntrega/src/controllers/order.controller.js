import OrderDAO from '../dao/orderDAO.js';
import Order from '../class/Order.js';

class OrderController {
  constructor() {
    this.orderDAO = new OrderDAO(); // Puedes pasar los valores necesarios aquí si es necesario
  }

  async createOrderFromSocket(order) {
    try {
     const objOrder = new Order(order)
      const newOrder = await this.orderDAO.createOrder(objOrder);
      return { newOrder };
    } catch (error) {
      console.error('Error en OrderController.createOrderFromSocket:', error);
    }
  }


  async deleteOrder(req, res) {
    try {
      const orderId = req.params.orderId;
      const deletedOrder = await this.orderDAO.deleteOrder(orderId); // Usar this.orderDAO
      if (!deletedOrder) {
        return res.status(404).json({ error: 'Orden no encontrada' });
      }
      res.json(deletedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const orderId = req.params.orderId;
      const order = await this.orderDAO.getOrderById(orderId); // Usar this.orderDAO
      if (!order) {
        return res.status(404).json({ error: 'Orden no encontrada' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrdersByUserId(req, res) {
    try {
      const userId = req.params.userId;
      const orders = await this.orderDAO.getOrdersByUserId(userId); // Usar this.orderDAO
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateOrder(req, res) {
    try {
      const orderId = req.params.orderId;
      const updateData = req.body;
      const updatedOrder = await this.orderDAO.updateOrder(orderId, updateData); // Usar this.orderDAO
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Orden no encontrada' });
      }
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default OrderController;
