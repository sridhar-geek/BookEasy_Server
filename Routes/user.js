import express from "express";
const router = express.Router();

/**Import functions from other files */
import {
    getProfile,
    updateProfile,
    deleteProfile
} from "../Controllers/user.js";

router.route('/:id').get(getProfile).put(updateProfile).delete(deleteProfile)

export default router;

