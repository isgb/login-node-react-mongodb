import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    // console.log(req.body)
    const {email, password, username} = req.body
    // console.log(email, password, username)

    try {
        
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        const userSaved = await newUser.save();

        jwt.sign(
            {
                id: userSaved._id,
            },
            "secret123",
            {}
        );

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
        // res.send("registrando");
    } catch (error) {
        console.log(error)
    }
    // console.log(newUser)

    // res.send("registrando");
};

export const login = (req,res) => {
    res.send("login");
};