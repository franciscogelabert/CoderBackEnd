import mongoose, { Schema } from 'mongoose';

const orderCollection = 'orders';

const orderSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  cartId: { type: Schema.Types.ObjectId, ref: "carts", required: true },
  orderId: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId, required: true },
  orderDate: { type: Date, default: Date.now, required: true }
});

export const orderModel = mongoose.model(orderCollection, orderSchema);
