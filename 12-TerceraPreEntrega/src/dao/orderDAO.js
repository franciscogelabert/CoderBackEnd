import { orderModel } from '../models/order.model.js';
import Order from '../class/Order.js';

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
        console.log('Cart insertado:', newOrder);
        resolve(newOrder);

      } catch (error) {
        console.error('Error:', error);
        reject(error);
      }
    });
  }
}

export default OrderDAO;
/*
const objDAO = new OrderDAO();
console.log("dao Creado");

const order = {
  userId: '6575e091db0aad49836c9262',
  cartId: '65ad30e856da7b559072308d',
  quantity: '2',
  totalPrice: '123',
  orderDate: '21/1/2024, 12:17:10',
  state: 'Pendiente'
};


const objOrder = new Order(order);
console.log("Orden Creada");

objDAO.createOrder(objOrder);

console.log("Orden Guardada en la Base");
*/