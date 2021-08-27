import jwt from 'jsonwebtoken';
import User from './../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            req.user = await User.findById(decoded.id);
            console.log(decoded.id);
        } catch (err) {
            console.error(err);
            res.status(401);
            throw new Error('Not authorized, token failed')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('No Token')
    }

    next()
})

export { protect }