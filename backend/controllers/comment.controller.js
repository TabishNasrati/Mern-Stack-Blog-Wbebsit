import Comment from "../models/comment.model.js";  
import User from "../models/user.model.js";
// import { useAuth,auth } from "@clerk/clerk-react";
import clerUserkId from "@clerk/clerk-sdk-node"



export const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId
    })
      .populate("user", "username img")
      .sort({ createdAt: -1 });

    return res.status(200).json(comments);  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


export const  addComment = async (req,res) => {
    const {userId} = req.auth();
    const clerUserkId = userId;
    console.log(clerUserkId, "this is clerk user id")
    const postId = req.params.postId
    console.log(postId, "this is post id")
    console.log(req.body, "this is body")
    if(!clerUserkId){
        return res.status(401).json("Not authenticated!")
    }

    const user = await User.findOne({ clerUserkId });

     
    const newComment = new Comment ({
        ...req.body,
        user:user._id,
        post:postId,

    });   
    console.log(newComment, "thi sis new comment")

    const savedComment = await newComment.save();

    setTimeout(() => {
        res.status(201).json(savedComment);
    }, 3000);

    console.log(savedComment, "this is saved comment")
  
};

export const  deleteComment = async (req,res) => {
    const clerUserId = req.auth.userId; 
    const id = req.params.id;

    if(!clerUserId){
        return res.status(401).json("Not authenticated!")
    }

    const user = User.findOne({clerUserkId});
    const deleteComment = await Comment.findOneAndDelete ({
        _id:id, 
        user:user._id
    });

    if(!deleteComment) {  
    return res.status(403).json("you can deleted only your comment!")
     }

    res.status(200).json("Comment deleted")

};