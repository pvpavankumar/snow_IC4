import express from "express";

const router = express.Router();

/**
 * @module postRoutes
 * @description Defines the routes related to posts.
 */

// middleware
import { requireSignin, canEditDeletePost } from "../middlewares";
// controllers
import { createPost, postsByUser, userPost, updatePost, deletePost, newsFeed, likePost, unlikePost } from "../controllers/post";

/**
 * @route POST /create-post
 * @description Create a new post
 * @access Private (requires authentication)
 */
router.post("/create-post", requireSignin, createPost);

/**
 * @route GET /user-posts
 * @description Get posts by user
 * @access Private (requires authentication)
 */
router.get("/user-posts", requireSignin, postsByUser);

/**
 * @route GET /user-post/:_id
 * @description Get a specific post by ID
 * @access Private (requires authentication)
 */
router.get("/user-post/:_id", requireSignin, userPost);

/**
 * @route PUT /update-post/:_id
 * @description Update a specific post by ID
 * @access Private (requires authentication and authorization)
 */
router.put("/update-post/:_id", requireSignin, canEditDeletePost, updatePost);

/**
 * @route DELETE /delete-post/:_id
 * @description Delete a specific post by ID
 * @access Private (requires authentication and authorization)
 */
router.delete("/delete-post/:_id", requireSignin, canEditDeletePost, deletePost);

/**
 * @route GET /news-feed
 * @description Get the news feed
 * @access Private (requires authentication)
 */
router.get("/news-feed", requireSignin, newsFeed);

/**
 * @route PUT /like-post
 * @description Like a post
 * @access Private (requires authentication)
 */
router.put("/like-post", requireSignin, likePost);

/**
 * @route PUT /unlike-post
 * @description Unlike a post
 * @access Private (requires authentication)
 */
router.put("/unlike-post", requireSignin, unlikePost);

module.exports = router;
