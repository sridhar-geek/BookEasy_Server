// // This is your test secret API key.
// import express from "express";
// import { StatusCodes } from "http-status-codes";
// import stripe from "stripe";
// const stripeInstance = stripe(process.env.STRIPE_KEY);

// const stripe = require("stripe")(
//   "sk_test_51O9mYASGJExsISoit8YFydY02cxLheypETBPxZMuPAlVqgCCT9ISQNPWPfh1Q1UlW8saXqLqQSxh6io2qWrbNW74006WWhhefs"
// );

// const DOMAIN = "http://localhost:3000";

// const checkOutSession = async(req,res)=> {
// app.post("/create-checkout-session", async (req, res) => {
//   const session = await stripeInstance.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: "{{PRICE_ID}}",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });
// }

// router.
