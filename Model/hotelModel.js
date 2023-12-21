import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      minLength: 3,
    },
    image: {
      type: String,
      default:
        "https://imgs.search.brave.com/aPFnAJCGtCjFvRI5vCCVs1edHRYSG5PiucHMlkDOaw8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTIw/NDQzMDYwL3Bob3Rv/L3RoZS10YWotbWFo/YWwtcGFsYWNlLWhv/dGVsLWF0LWR1c2su/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUVKa1ZlZUxtXzZu/eW5zN2JmVWxDamdz/UE40STRSOWd0Q3Nm/a3RZX2dsOWs9",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide user"],
    },
    paymentId: String,
    orderId: String,
    rooms: {
      type: Number,
      minimum: 1,
    },
    adults: {
      type: Number,
      minimum: 1,
    },
    children: Number,
    amount: Number,
    arrivalDate: Date,
    departureDate: Date,
  },
  { timestamps: true }
);

export const Hotel = mongoose.model("Hotels", HotelSchema)

// creating Hotel schema to store Booked hotel details of User