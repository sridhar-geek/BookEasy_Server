import express from "express";
const router = express.Router();

/* Imports from another files */
import {createHotel, getAllHotels,getSingleHotel, deleteHotel} from '../Controllers/hotels.js'

router.route("/:id").get(getSingleHotel).delete(deleteHotel);
router.route("/").post(createHotel).get(getAllHotels)


export default router;

// It takes all the requests and routes accourding to it