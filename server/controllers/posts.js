import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import path from 'path';
import PostMessage from '../models/postMemory.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMemory = async (req, res) => {
    const { title, message, creator, tags } = req.body;
    const selectedFile = req.file ? `/uploads/posts/${req.file.filename}` : '';

    const newPostMessage = new PostMessage({
        title, 
        message, 
        selectedFile, 
        creator, 
        tags
    });

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, tags } = req.body;
  
    // Check if the post exists
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`);
    }
  
    // If a new file was uploaded, process the file
    const selectedFile = req.file ? req.file.path : req.body.selectedFile;
  
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  
    res.json(updatedPost);
  };
  

  export const deletePost = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`);
    }
  
    // Find the post first to get the file path
    const post = await PostMessage.findById(id);
    
    // If the post has an associated file, delete it from the server
    if (post.selectedFile) {
      const filePath = path.join(__dirname, '../', post.selectedFile);
      fs.unlink(filePath, (err) => {
        if (err) console.log(err); // Handle file delete errors
      });
    }
  
    await PostMessage.findByIdAndDelete(id);
  
    res.json({ message: 'Post deleted successfully' });
  };

  export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export default router;