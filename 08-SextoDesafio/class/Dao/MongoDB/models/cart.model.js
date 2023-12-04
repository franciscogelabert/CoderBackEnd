import mongoose, { Schema } from 'mongoose';

const cartCollection = 'carts';

  
  const listaSchema = new mongoose.Schema({
    IdProd: { type: Schema.Types.ObjectId , ref: "products" },
    CantProd: { type: Number, required: true }
  });
  
  const cartSchema = new mongoose.Schema({
    
    IdUser: { type: String, required: true },
    lista: [listaSchema]
  });
  


 export const  cartModel = mongoose.model(cartCollection,cartSchema);