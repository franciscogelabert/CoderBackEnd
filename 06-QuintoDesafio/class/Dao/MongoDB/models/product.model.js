import mongoose from 'mongoose';

const productCollection = 'products';

const productSchema= new mongoose.Schema({
    title: String,
    description: String,
    code: {
        type: Number,  
        required: true 
    },
    price: {
        type: Number,  
        required: true 
    },
    stock:{
        type: Number,  
        required: true 
    },
    thumbnail: [String],  
    estado: Boolean,
    category: String

});





export const  productModel = mongoose.model(productCollection,productSchema);