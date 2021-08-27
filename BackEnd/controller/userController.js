import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from './../utils/generateToken.js'

//Authentication
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            photo: user.photo,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            photo: user.photo,
            role: user.role,
        })
    } else {
        res.status(404)
        throw new Error('User not found.')
    }
})

const registerUser = (async (req, res) => {

    try {
        const { name, email, password } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400)
            throw new Error('User alresy exists.')
        }

        const user = await User.create({
            _id: Math.random() * 1234567899, name, email, password
        })

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                photo: user.photo,
                role: user.role,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('User not created')
        }
    } catch (err) {
        console.log(err);

        throw err;
    }
})

export { authUser, getUserProfile, registerUser }
