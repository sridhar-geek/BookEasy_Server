// this middleware used for authorization for the user, it verify token and allow user accourding to it

import jwt from "jsonwebtoken";

import UnauthenticatedError from "../errors/unauthenticated.js";

export const autherization = async (req, res, next) => {
 const header = req.headers.authorization

    if(!header || !header.startsWith('Bearer'))
        throw new UnauthenticatedError('Authentication invalid')

    const token = header.split(' ')[1]
     try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Token expired Please login again");
  }
};
