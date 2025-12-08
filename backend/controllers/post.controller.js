import express from "express";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";
import dotenv from "dotenv";
 

dotenv.config();



export const getPosts = async (req,res)=> {

  const page = parseInt (req.query.page) || 1;
  const limit = parseInt (req.query.limit) || 2;

    const posts = await Post.find()
    .populate("user", "username")
    .limit(limit)
    .skip((page - 1) * limit);
      
    const totalPosts = await Post.countDocuments();
    const hasMore = (page * limit) < totalPosts;

    res.status(200).json({ posts,hasMore });
};



export const getPost = async (req,res)=> {
    const post = await Post.findOne({ slug:req.params.slug }).populate(
      "user", 
      "username img"
      );
    res.status(200).json(post);
};




export const createPost = async (req,res)=> {
    const {userId} = req.auth();
    const clerkUserkId = userId;
    console.log(clerkUserkId, "this is clerk user id")
    console.log(userId, "user id")
   
  console.log(req.body, "thish is new post from body")

    if (!clerkUserkId){
        return res.status(401).json("not authenticated!")
    }

    const user = await User.findOne ({clerkUserkId});

    console.log(user, "this is user id")

    if (!user) {
        return res.status(404).json("User not found!")
    }

    let slug = req.body.title.replace(/ /g ,"-").toLowerCase();

    let existingPost = await Post.findOne ({ slug });

    let counter = 2;

    while (existingPost) {
        slug = `${slug}-${counter}`;
        existingPost =  await Post.findOne ({ slug }) ;
        counter++;
    }

    const newPost = new Post ({ slug, user: user, ...req.body});
    const post = await newPost.save();
    res.status(200).json(post);
};




export const  deletePost = async (req,res)=> {
  const clerkUserId = req.auth.userId;

 const role = req.auth.sessionClaims?.metadata?.role || "user";
 
 if (role === "admin") {
  await Post.findByIdAndDelete (req.params.id);
  return res.status(200).json("Post has been deleted");
 }

  if(!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

    const user = await User.findOne ({ clerkUserId });

    const deletedPost = await Post.findByIdAndDelete({
        _id: req.params.id, 
        user:user._id
     });

     if(!deletedPost) {
        return res.status(403).json("you can delete only your posts!");
     }


    res.status(200).json("Post has been deleted");
};




console.log("BACK PUBLIC:", process.env.IK_PUBLIC_KEY);
console.log("BACK URL:", process.env.IK_URL_ENDPOINT);

  const imagekit = new ImageKit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT,
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};



