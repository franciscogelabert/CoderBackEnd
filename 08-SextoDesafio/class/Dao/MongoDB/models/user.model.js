import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema= new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

userSchema.plugin(mongoosePaginate);

export const  userModel = mongoose.model(userCollection,userSchema);