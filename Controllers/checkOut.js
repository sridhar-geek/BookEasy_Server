import express from "express";
const router = express.Router();
import { StatusCodes } from "http-status-codes";
import Razorpay from "razorpay";

/** Imports from other files */
import NotFoundError from "../errors/not-found.js";
import BadRequestError from "../errors/bad-request.js";


// checkout route       route : /api/create-checkout
const checkOut = async()=> {
    
}

router.post("/", checkOut);

export default router;

