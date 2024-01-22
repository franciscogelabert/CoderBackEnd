import mongoose, { Schema } from 'mongoose';

const orderCollection = 'orders';

const orderSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  cartId: { type: Schema.Types.ObjectId, ref: "carts", required: true },
  orderDate: { type: String, required: true },
  state: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  email: { type: String, required: true }
});

export const orderModel = mongoose.model(orderCollection, orderSchema);
