import express from "express";
import { savePost, deleteSavedPost } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/saved/:postId", savePost);
router.delete("/saved/:postId", deleteSavedPost);

export default router;
