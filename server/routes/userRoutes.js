import express from "express";
import upload from '../middleware/profilePics.js';
import auth from '../middleware/auth.js';
const router = express.Router();


import { signin, signup, updateUser } from "../controllers/usersController.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/edituser/:id", auth, upload.single('profilePics'), updateUser);

export default router;

