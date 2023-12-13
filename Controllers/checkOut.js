import express from "express";
const router = express.Router();
import { StatusCodes } from "http-status-codes";
import Razorpay from "razorpay";

/** Imports from other files */
import NotFoundError from "../errors/not-found.js";
import BadRequestError from "../errors/bad-request.js";

// checkout route       route : /api/create-checkout
const checkOut = async (req, res) => {
  const data = req.body;
  console.log("request came here");
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
console.log(data)
  const order = await razorpay.orders.create(data);
  console.log(order)
  if (!order)
    return res.status(StatusCodes.BAD_REQUEST).json("Order creation failed");
  res.status(StatusCodes.OK).json(order);
};

router.post("/", checkOut);

export default router;
