import mongoose from "mongoose";
import Post from "../Models/Post.js";

export const getAllPosts = async (req,res)=>{
    try {
        const posts = await Post.find().sort({createdAt:-1});
        if(!posts) res.status(404).json({error : "cannot find posts"});
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

export const getAPost = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({error:"Invalid ID"});
    try {
        const post = await Post.findById(id);
        if(!post) res.status(400).json({error:"Post doesn't exist"});
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

export const deletePost = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({error:"Invalid ID"});
    try {
        const post = await Post.findById(id);
        if(!post) res.status(400).json({error:"Post doesn't exist"});
        const deletedPost =  await Post.findOneAndDelete({_id : id});
        res.status(200).json({msg : "Post deleted"});
    } catch (error) {
        res.status(404).json(error.message);
    }
};

export const createPost = async (req,res)=>{
    const {date,title,content} = req.body;
    try {
        const post = await Post.create({date,title,content});
        res.status(200).json({post});
    } catch (error) {
        res.status(400).json({'error' : error.message});
    }
};

export const updatePost = async (req,res)=>{
    const {id} = req.params;
    const {date,title,content} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({error:"Invalid ID"});
    try {
        const post = await Post.findById(id);
        if(!post) res.status(400).json({error:"Post doesn't exist"});
        const updatedPost = await Post.findOneAndUpdate({_id : id},{date,title,content});
        res.status(200).json({msg : "Post updated"});
    } catch (error) {
        res.status(404).json(error.message);
    }
};
