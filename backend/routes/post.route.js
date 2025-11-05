import express from "express"
import Post from "../models/post.model.js"
import { getPosts,getPost } from "../controllers/post.controller.js"




const router = express.Router();

router.get("/", getPosts );
router.get("/:slug", getPost );
// router.post("/", getPost );




export default router;