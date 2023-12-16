import express from "express";
const router = express.Router();

/* Imports from another files */
import {validatePayment, createCheckOut} from '../Controllers/checkOut.js'

router.post("/validate", validatePayment);
router.post("/create-checkout", createCheckOut);

export default router;