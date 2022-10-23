const Post = require('../models/post')
const User = require('../models/user')
const mongoose = require('mongoose')

exports.createPost = async (req, res)=>{
    try {
        const newPost = await Post.create(req.body)
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.updatePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.updateOne({$set : req.body})
            res.status(201).json('The post has been updated')
        }else{
            res.status(403).json('You cannot update a post you did not create')
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deletePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(201).json('The post has been deleted')
        }else{
            res.status(403).json('You cannot delete a post you did not create')
        }

        
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.likePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.likes.includes(req.body.userId)){
            
            res.status(403).json('You have already liked this post')
        }else{
            await post.updateOne({ $push : {likes : req.body.userId}})
            res.status(200).json('You liked this post successfully')
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.dislikePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.dislikes.includes(req.body.userId)){
            
            res.status(403).json('You have already disliked this post')
        }else{
            await post.updateOne({ $push : {dislikes : req.body.userId}})
            res.status(200).json('You disliked this post successfully')
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getPost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.timelinePosts = async (req, res)=>{
    try {
        const currentUser = await User.findById(req.body.userId)
        const userPosts = await Post.find({userId : currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.following.map(friendsId => {
                Post.find({ userId : friendsId})
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))

    } catch (error) {
        res.status(500).json(error)
    }
}