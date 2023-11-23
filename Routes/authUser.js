import express from "express";
const router = express.Router();

/**Import functions from other files */
import {
  loginUser,
  registerUser,
  socialLogin,
  getAllUsers,
} from "../Controllers/authUser.js";

router.get("/get", getAllUsers)
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/socialLogin", socialLogin);

export default router;

// It takes all the requests and routes accourding to it
