import jwt from "jsonwebtoken";

import UnauthenticatedError from "../errors/unauthenticated.js";
import User from "../Model/userModel.js";

export const authentication = async(req, res, next) => {
  let token = req.cookies.token

  if (!token )
    throw new UnauthenticatedError("Authencation is invalid");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.userId).select('-password')
    next();
  } catch (error) {
    throw new UnauthenticatedError("Token expired Please login again");
  }
};

 
