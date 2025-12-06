import express from "express"
import { getUserSavedPosts, savePost } from "../controllers/user.controller.js"


const router = express.Router()

router.get("/saved" , getUserSavedPosts)
router.post("/saved/:postId", savePost);


export default router