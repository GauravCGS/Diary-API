import express from "express";
import {getAllPosts,getAPost,createPost,deletePost,updatePost} from "../Controllers/postsController.js";

const router = express.Router();
router.get('/',getAllPosts);
router.post('/',createPost);
router.get('/:id',getAPost);
router.delete('/:id',deletePost);
router.patch('/:id',updatePost);

export default router;

