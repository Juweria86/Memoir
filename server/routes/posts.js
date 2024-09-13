import express from "express";

const router = express.Router();

import { getPosts, createMemory, updatePost, deletePost } from '../controllers/posts.js';


router.get('/', getPosts);
router.post('/', createMemory);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;