import express , {Request , Response , NextFunction} from 'express';
import User , {UserInterface} from '../models/usersDB';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const register = async (req: Request , res: Response , next: NextFunction) => {
    try {
        const {username , password , email} = req.body;
        const user: UserInterface = new User({
            username,
            password,
            email,
            productsPosted: []
        });
        const existingUser = await User.findOne({username});
        if(existingUser){
            res.status(400).json({message: 'User already exists'});
            return;
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password , salt);
        await user.save();
        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({message: " "});
    }
};

const login = async (req: Request , res: Response , next: NextFunction): Promise<void> => {
    try {
        const {username , password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            res.status(400).json({message: 'User not found'});
            return;
        } 
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            res.status(400).json({message: 'Invalid credentials'});
            return;
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload , process.env.JWT_SECRET as string , {expiresIn: '1h'} , (error , token) => {
            if(error) throw error;
            res.status(200).json({token , _id: user.id});
        });
    } catch (error) {
        res.status(500).json({message: " "});
    }
};

const AuthController = { register , login };
export default AuthController;

