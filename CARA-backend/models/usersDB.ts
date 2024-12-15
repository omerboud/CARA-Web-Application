import mongoose from 'mongoose';

export interface UserInterface extends mongoose.Document {
    username: string;
    password: string;
    email: string;
    productsPosted: Array<string>;
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
    productsPosted:{
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