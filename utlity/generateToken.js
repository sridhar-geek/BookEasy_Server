import jwt from 'jsonwebtoken'

// creating cookie by accepting userId from the register and login route
export const generateToken = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:process.env.TIME})
   
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30*24*60*1000,
    })
};


