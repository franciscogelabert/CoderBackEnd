import mongoose from 'mongoose';

const messageCollection = 'message';

const messageSchema= new mongoose.Schema({
   author: {
        type: String,  
        required: true 
    },
    message: {
        type: String,  
        required: true 
    }
});

export const  messageModel = mongoose.model(messageCollection,messageSchema);