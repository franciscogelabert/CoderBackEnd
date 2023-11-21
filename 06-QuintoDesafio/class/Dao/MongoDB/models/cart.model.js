import mongoose from 'mongoose';

const cartCollection = 'carts';

  
  const listaSchema = new mongoose.Schema({
    IdProd: { type: String, required: true },
    CantProd: { type: Number, required: true }
  });
  
  const cartSchema = new mongoose.Schema({
    
    IdUser: { type: String, required: true },
    lista: [listaSchema]
  });
  


 export const  cartModel = mongoose.model(cartCollection,cartSchema);