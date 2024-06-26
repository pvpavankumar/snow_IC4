import express from "express";

const router = express.Router();

// middleware
import { requireSignin, canEditDeletePost } from "../middlewares";
// controllers
import { createPost, postsByUser, userPost, updatePost, deletePost,newsFeed, likePost,
    unlikePost} from "../controllers/post";

router.post("/create-post", requireSignin, createPost);
router.get("/user-posts", requireSignin, postsByUser);
router.get("/user-post/:_id", requireSignin, userPost);
router.put("/update-post/:_id", requireSignin, canEditDeletePost, updatePost);
router.delete("/delete-post/:_id",requireSignin,canEditDeletePost,deletePost);
router.get("/news-feed", requireSignin, newsFeed);

router.put("/like-post", requireSignin, likePost);
router.put("/unlike-post", requireSignin, unlikePost);

  

module.exports = router;
