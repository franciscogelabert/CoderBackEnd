import mongoose from 'mongoose';

const cartCollection = 'carts';

  
  const listaSchema = new mongoose.Schema({
    IdProd: { type: Number, required: true },
    CantProd: { type: Number, required: true }
  });
  
  const cartSchema = new mongoose.Schema({
    lista: [listaSchema]
  });
  


 export const  cartModel = mongoose.model(cartCollection,cartSchema);