import express from "express";
const router = express.Router();

/* Imports from another files */
import {validatePayment, createCheckOut} from '../Controllers/checkOut.js'

router.post("/create-checkout", createCheckOut);
router.post("/validate", validatePayment);

export default router;