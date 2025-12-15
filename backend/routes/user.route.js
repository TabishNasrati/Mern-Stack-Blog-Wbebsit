import express from "express";
import { savePost, deleteSavedPost, getSavedPosts } from "../controllers/user.controller.js";

const router = express.Router();

// Get all saved posts for the user
router.get("/saved", getSavedPosts);

router.post("/saved/:postId", savePost);
router.delete("/saved/:postId", deleteSavedPost);

export default router;
