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
    const {userId} = req.auth();
    console.log(userId, "this is user id")
    const { postId } = req.params;   // ✔ از params گرفتیم
    console.log(postId, "this is post id")
    const clerkUserId = userId;
    console.log(clerkUserId, "this is clerk user id")

    if (!clerkUserId) {
      return res.status(401).json("Not authenticated");
    }
  
    const user = await User.findOne({ clerkUserId: clerkUserId });

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

  
  
  export const deleteSavedPost = async (req, res) => {
    try {
      const {userId} = req.auth();
      const clerkUserId = userId;
      const { postId } = req.params;
  
      if (!clerkUserId) return res.status(401).json("Not authenticated");
  
      const user = await User.findOne({ clerkUserId: clerkUserId });
  
      user.savedPosts = user.savedPosts.filter((id) => id !== postId);
      await user.save();
  
      res.status(200).json("Post removed");
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

