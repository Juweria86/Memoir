import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

import { getPosts, createMemory, updatePost, deletePost } from '../controllers/posts.js';


router.get('/getpost', getPosts);
router.post('/create', auth, createMemory);
router.patch('/:id/update', auth, updatePost);
router.delete('/:id/delete', auth, deletePost);

export default router;