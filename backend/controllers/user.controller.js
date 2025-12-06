import User from "../models/user.model.js";   // این درست است، نه clerk-sdk-node

export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await User.findOne({ clerkId: clerkUserId });

  if (!user) {
    return res.status(404).json("User not found");
  }

  res.status(200).json(user.savedPosts);
};



export const savePost = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const { postId } = req.params;   // ✔ از params گرفتیم
  
    if (!clerkUserId) {
      return res.status(401).json("Not authenticated");
    }
  
    const user = await User.findOne({ clerkId: clerkUserId });
  
    if (!user) {
      return res.status(404).json("User not found");
    }
  
    const isSaved = user.savedPosts.includes(postId);
  
    if (!isSaved) {
      await User.findByIdAndUpdate(user._id, {
        $push: { savedPosts: postId }
      });
    } else {
      await User.findByIdAndUpdate(user._id, {
        $pull: { savedPosts: postId }
      });
    }
  
    res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
  };
  


