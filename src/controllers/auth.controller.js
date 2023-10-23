import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    // console.log(req.body)
    const {email, password, username} = req.body
    // console.log(email, password, username)

    try {

        const userFound = await User.findOne({email})
        if(userFound)
            return res.status(400).json(["The email already in use"]);
        
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id : userSaved._id})

        res.cookie('token', token)
        
        // res.json({
        //     message: "user created successfully"
        // })

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
        // res.send("registrando");

    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: error.message })
    }
    // console.log(newUser)

    // res.send("registrando");
};

export const login = async (req, res) => {
    // console.log(req.body)
    const {email, password } = req.body
    // console.log(email, password, username)

    try {

        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json({ message: "User not found"});

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({ message: "Incorrect password"});

        const token = await createAccessToken({ id : userFound._id})

        res.cookie('token', token);
        // res.json({
        //     message: "user created successfully"
        // })
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
        // res.send("registrando");

    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: error.message })
    }
    // console.log(newUser)

    // res.send("registrando");
};

export const logout = (req,res) => {
    res.cookie('token', "",{
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    // console.log(req.user)
    // res.send('profile')

    const userFound = await User.findById(req.user.id);

    if(!userFound) return res.status(400).json({ message: "User not found"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updateAt,
    })
}

// export const login = (req,res) => {
//     res.send("login");
// };