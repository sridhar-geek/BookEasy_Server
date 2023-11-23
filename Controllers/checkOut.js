import express from 'express'
const router = express.Router()
import { StatusCodes } from "http-status-codes";
import stripe from "stripe";
const stripeInstance = stripe(process.env.STRIPE_KEY);


/**Import functions */
import { User } from "../Model/userModel.js";
import NotFoundError from "../errors/not-found.js";
import BadRequestError from "../errors/bad-request.js";

const DOMAIN = 'http://localhost:3000';

const checkOut = async (req, res)=> {
    const data = req.body;
    console.log(data)
  const session = await stripeInstance.checkout.sessions.create({
    line_items: data,
    payment_method_types: ["card"],
    mode: "payment",
    ui_mode: "embedded",
    return_url : `${DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`
  });
       res.status(StatusCodes.OK).json({ id: session.client_secret });
       console.log(session.client_secret)
}

const sessionStatus = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
};

router.post('/', checkOut)
router.get('/session-status', sessionStatus)

export default router



