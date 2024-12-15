import mongoose from 'mongoose';

export interface UserInterface extends mongoose.Document {
    username: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
    address: string;
    phone_number: string;
    date_of_birth: Date;
    gender: string;
    productsPosted: Array<string>;
    productsBought: Array<string>;
    createdAt: Date;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone_number:{
        type: String,
        required: true
    },
    date_of_birth:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    productsPosted:{
        type: Array,
        default: []
    },
    productsBought:{
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;