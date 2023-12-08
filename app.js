import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import stripe from "stripe";
dotenv.config();
const app = express();

/**Imports functions from another files */
import userRoutes from "./Routes/user.js";
import authRoutes from "./Routes/authUser.js";
import CheckOutRoute from './Controllers/checkOut.js'
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import { autherization } from "./middleware/autherization.js";


app.get('/', (req,res)=> {
  res.send('<h1>Welcome to book easy server</h1>')
})

/**Middlewares */

/**used to access data from req.body */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors())
// app.use(
//   cors({
//     credentials: true,
//     origin: 'http://localhost:3000/*',
//     origin: "https://book-easy-client.vercel.app/*"
//   })
// );

// app.use('/api/checkout', CheckOutRoute)
app.use("/api/user", autherization, userRoutes);
app.use("/api/auth", authRoutes);

app.get('/api/welcome' ,(req,res)=>{
  res.send('<h1>Im in welcome route</h1>')
})

// This is your test secret API key.
const stripeInstance = stripe(process.env.STRIPE_KEY);
app.post("/api/create-checkout-session", async (req, res) => {
  console.log("request came to checkout session");
  const data = req.body
  console.log(data)
  const session = await stripeInstance.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 500,
          product_data: {
            name: "hotel vizag",
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000?success=true`,
    cancel_url: `http://localhost:3000?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 4000;

/* starter function to start the server only when mongodb connected */
const start = async () => {
  try {
    // mongoose connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DataBase");
    app.listen(PORT, () => console.log(`Server is lisening on port ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
};

start();
