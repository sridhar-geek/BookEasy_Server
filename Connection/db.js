import mongoose from "mongoose";

// connection function to connect to mongoDB 
export const connectToDB = (uri)=> {
     mongoose.connect(uri)
     console.log('Connected to DataBase')
}
