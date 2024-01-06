import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema= new mongoose.Schema({
    title: String,
    description: String,
    code: {
        type: Number,  
        required: true, 
        index: true 
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

productSchema.plugin(mongoosePaginate);

export const  productModel = mongoose.model(productCollection,productSchema);