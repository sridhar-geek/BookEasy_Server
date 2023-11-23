import jwt from "jsonwebtoken";

import UnauthenticatedError from "../errors/unauthenticated.js";

// console.log(process.env.JWT_SECRET)
export const autherization = async(req, res, next) => {
  let token = req.cookies.access_token;
  if (!token )
    throw new UnauthenticatedError("Authencation is invalid");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload
    next();
  } catch (error) {
    throw new UnauthenticatedError("Token expired Please login again");
  }
};

 

// this middleware used for authorization for the user, it verify token and allow user accourding to it