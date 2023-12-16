import { StatusCodes } from "http-status-codes";
import Razorpay from "razorpay";
import crypto from 'crypto'


// desc: creates orderId for the payment       route : /api/payment/create-checkout
export const createCheckOut = async (req, res) => {
  const data = req.body;
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  const order = await razorpay.orders.create(data);
  if (!order)
    return res.status(StatusCodes.BAD_REQUEST).json("Order creation failed");
  res.status(StatusCodes.OK).json(order);
};

//desc: validate payment                route: /api/payment/validate
export const validatePayment = async(req,res)=> {
   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
     req.body;
  const CreateSignature = crypto.createHmac(
    "sha256",
    process.env.RAZORPAY_KEY_SECRET
  );
  CreateSignature.update(`${razorpay_order_id}|${razorpay_payment_id}`)
  const signature = CreateSignature.digest('hex')
  if(signature !== razorpay_signature){
    return res.status(StatusCodes.BAD_GATEWAY).json('Transaction is not legit! please try again later')
  }
  res.status(StatusCodes.ACCEPTED).json({msg: 'payment success', orderId: razorpay_order_id, paymentId: razorpay_payment_id})
}


