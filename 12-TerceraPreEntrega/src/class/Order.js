
class Order {
    constructor(order) {
        this.userId = order.userId;
        this.cartId = order.cartId;
        this.orderDate = order.orderDate;
        this.state = order.state;
        this.quantity = order.quantity;
        this.totalPrice = order.totalPrice;
   }
}

export default Order;