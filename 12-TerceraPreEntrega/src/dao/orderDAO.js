import { orderModel } from '../models/order.model.js'; // Ajusta la ruta según tu estructura de archivos

export const orderDAO = {
  async createOrder(userId, cartId) {
    try {
      const newOrder = new orderModel({ userId, cartId });
      const savedOrder = await newOrder.save();
      return savedOrder;
    } catch (error) {
      throw new Error(`Error al crear la orden: ${error.message}`);
    }
  },

  async deleteOrder(orderId) {
    try {
      const deletedOrder = await orderModel.findByIdAndDelete(orderId);
      return deletedOrder;
    } catch (error) {
      throw new Error(`Error al eliminar la orden: ${error.message}`);
    }
  },

  async getOrderById(orderId) {
    try {
      const order = await orderModel.findById(orderId);
      return order;
    } catch (error) {
      throw new Error(`Error al obtener la orden: ${error.message}`);
    }
  },

  async getOrdersByUserId(userId) {
    try {
      const orders = await orderModel.find({ userId });
      return orders;
    } catch (error) {
      throw new Error(`Error al obtener las órdenes del usuario: ${error.message}`);
    }
  },

  async updateOrder(orderId, updateData) {
    try {
      const updatedOrder = await orderModel.findByIdAndUpdate(orderId, updateData, { new: true });
      return updatedOrder;
    } catch (error) {
      throw new Error(`Error al actualizar la orden: ${error.message}`);
    }
  },
};