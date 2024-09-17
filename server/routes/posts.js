import express from "express";
import auth from "../middleware/auth.js";
import upload from '../middleware/upload.js';

const router = express.Router();

import { getPosts, createMemory, updatePost, deletePost } from '../controllers/posts.js';


router.get('/getpost', getPosts);
router.post('/create', auth, upload.single('selectedFile'), createMemory);
router.patch('/update/:id', auth, upload.single('selectedFile'), updatePost);
router.delete('/delete/:id', auth, deletePost);

export default router;