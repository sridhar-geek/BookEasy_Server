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
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import { autherization } from "./middleware/autherization.js";


app.get('/', (req,res)=> {
  res.send('<h1>Welcome to Book Easy Server</h1>')
})
/**Middlewares */

/**used to access data from req.body */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "https://book-easy-client.vercel.app/*",
    origin: 'http://localhost:3000/'
  })
);

app.use("/api/user", autherization, userRoutes);
app.use("/api/auth", authRoutes);
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
