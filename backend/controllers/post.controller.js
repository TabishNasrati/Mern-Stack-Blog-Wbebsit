import express from "express";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";
import dotenv from "dotenv";
 

dotenv.config();



export const getPosts = async (req,res)=> {

  const page = parseInt (req.query.page) || 1;
  const limit = parseInt (req.query.limit) || 2;
 

  const query = {};
  let sortObj = { createdAt: -1 };

  console.log(req.query, "this is req query ")

  const { cat, author, searchQuery, sortQuery,featured  } = req.query;
  // const featured = req.query.featured;
   
  if (cat) {
    query.category = cat;
  }

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: "i"};
  }

  if (author) {
    const user = await User.findOne({ username: author }).select("_id");

    if (!user) {
      return res.status(401).json("Not post found!");
    }

    query.user = user._id;

     let sortObj = {createdAt : -1}

  }

  if (sortQuery) {
    switch (sortQuery) {
      case "newest":
        sortObj = { createdAt: -1 };
        break;
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "popular":
        sortObj = { visit: -1 };
        break;
      case "trending":
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      default:
        break;
    }
  }


  if (featured) {
    query.isFeatured = true;
  }


    const posts = await Post.find(query)
    .populate("user", "username")
    .sort(sortObj)
    .limit(limit)
    .skip((page - 1) * limit);
      
    const totalPosts = await Post.countDocuments(query);
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





export const createPost = async (req, res) => {
  try {
    
    const { userId } = req.auth?.() || {};

    console.log("CLERK USER ID 👉", userId);
    console.log("BODY 👉", req.body);

    if (!userId) {
      return res.status(401).json("Not authenticated");
    }

   
    if (!req.body.title || !req.body.desc || !req.body.content) {
      return res.status(400).json("Missing required fields");
    }

    
    const user = await User.findOne({ clerkUserId: userId });

    if (!user) {
      return res.status(404).json("User not found");
    }

   
    let slug = req.body.title
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();

    let existingPost = await Post.findOne({ slug });
    let counter = 2;

    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await Post.findOne({ slug });
      counter++;
    }

    
    const newPost = new Post({
      slug,
      user: user._id,
      ...req.body,
    });

    const post = await newPost.save();
    res.status(201).json(post);

  } catch (err) {
    console.error("CREATE POST ERROR ", err);
    res.status(500).json({
      message: err.message,
    });
  }
};




export const  deletePost = async (req,res)=> {
   const {userId} = req.auth();
   const clerkUserId = userId ;

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


export const  featurePost = async (req,res)=> {
  const {userId} = req.auth();
  const {sessionClaims} = req.auth();
  const  {metadate } = sessionClaims;
  const role = metadate.role || "user"
  console.log(metadate.role, "this is meta data")

  console.log(sessionClaims, "this is session claims")
  console.log(req.auth(), "this is req auth")
  console.log(userId, "this is user id")
  const clerkUserId = userId;
  const postId = req.params.id;

 
 
 if (role !== "admin") {
  
  return res.status(403).json("You cannot feature posts!");
 }

  if(!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json("post not found")
    }

    const isFeatured = post.isFeatured
  
     const updatedPost = await Post.findByIdAndUpdate (postId,{
      isFeatured:!isFeatured,
    },
    {new:true}
    );

    res.status(200).json(updatedPost);
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



