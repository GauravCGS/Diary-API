import express from "express";
import {getAllPosts,getAPost,createPost,deletePost,updatePost} from "../Controllers/postsController.js";
import { requestAuth } from "../Middleware/auth.js";

const router = express.Router();
router.use(requestAuth);
router.get('/',getAllPosts);
router.post('/',createPost);
router.get('/:id',getAPost);
router.delete('/:id',deletePost);
router.patch('/:id',updatePost);

export default router;

