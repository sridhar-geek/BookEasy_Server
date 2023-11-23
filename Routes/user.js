import express from "express";
const router = express.Router();

/**Import functions from other files */
import {
  getProfile,
  updateProfile,
  deleteProfile,
  logoutUser,
} from "../Controllers/user.js";

router.route("/:id").get(getProfile).put(updateProfile).delete(deleteProfile);
router.get('/logout/:id', logoutUser)


export default router;

// It takes all the requests and routes accourding to it
