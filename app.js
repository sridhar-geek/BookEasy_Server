import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();

/**Imports functions from another files */
import userRoutes from "./Routes/user.js";
import authRoutes from "./Routes/authUser.js";
import CheckOutRoute from './Routes/checkOut.js';
import hotelRoutes from './Routes/hotels.js'
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import { autherization } from "./middleware/autherization.js";


app.get('/', (req,res)=> {
  res.send('<h1>Welcome to book easy server</h1>')
})

/**Middlewares */

/**used to access data from req.body */
// app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://book-easy-client.vercel.app",
    // origin: "http://localhost:3000", 
    credentials: true,
  })
);
  /** this middleware use to set header to application/json automatically, but it is not working as expected */
  // app.use((req, res, next) => {
  //   res.setHeader("Content-Type", "application/json");
  //   next();
  // });
  app.use("/api/auth", authRoutes);
  app.use("/api/user", autherization, userRoutes);
  app.use("/api/payment", autherization, CheckOutRoute);
  app.use("/api/hotel", autherization, hotelRoutes);

app.get('/api/welcome' ,(req,res)=>{
  res.send('<h1>Im in welcome route</h1>')
})

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
