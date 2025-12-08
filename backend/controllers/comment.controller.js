import Comment from "../models/comment.model.js";  
import User from "../models/user.model.js";




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
    const clerkUserId = userId;
    console.log(clerkUserId, "this is clerk user id")
    const postId = req.params.postId
   
    if(!clerkUserId){
        return res.status(401).json("Not authenticated!")
    }

    const user = await User.findOne({ clerkUserId });
    console.log(user._id, "this is user for createing comment" )

     
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
    const {userId} = req.auth();
    const clerkUserId = userId; 
    const id = req.params.Id;
    console.log(id, "this is id for comment")

    if(!clerkUserId){
        return res.status(401).json("Not authenticated!")
    }


    const role = req.auth.sessionClaims?.metadata?.role || "user";
 
    if (role === "admin") {
     await Comment.findByIdAndDelete (req.params.id);
     return res.status(200).json("Comment has been deleted");
    }



    const user = await User.findOne({clerkUserId});
    console.log(user._id, "this is user id for delete")
    const deleteComment = await Comment.findOneAndDelete ({
        _id:id, 
        user:user._id
    });


    if(!deleteComment) {  
    return res.status(403).json("you can deleted only your comment!")
     }

    res.status(200).json("Comment deleted")

};