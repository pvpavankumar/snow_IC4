import asyncHandler from "../async-handler";
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
router.post("/create-post", asyncHandler(requireSignin), asyncHandler(createPost));

/**
 * @route GET /user-posts
 * @description Get posts by user
 * @access Private (requires authentication)
 */
router.get("/user-posts", asyncHandler(requireSignin), asyncHandler(postsByUser));

/**
 * @route GET /user-post/:_id
 * @description Get a specific post by ID
 * @access Private (requires authentication)
 */
router.get("/user-post/:_id", asyncHandler(requireSignin), asyncHandler(userPost));

/**
 * @route PUT /update-post/:_id
 * @description Update a specific post by ID
 * @access Private (requires authentication and authorization)
 */
router.put("/update-post/:_id", asyncHandler(requireSignin), asyncHandler(canEditDeletePost), asyncHandler(updatePost));

/**
 * @route DELETE /delete-post/:_id
 * @description Delete a specific post by ID
 * @access Private (requires authentication and authorization)
 */
router.delete("/delete-post/:_id", asyncHandler(requireSignin), asyncHandler(canEditDeletePost), asyncHandler(deletePost));

/**
 * @route GET /news-feed
 * @description Get the news feed
 * @access Private (requires authentication)
 */
router.get("/news-feed", asyncHandler(requireSignin), asyncHandler(newsFeed));

/**
 * @route PUT /like-post
 * @description Like a post
 * @access Private (requires authentication)
 */
router.put("/like-post", asyncHandler(requireSignin), asyncHandler(likePost));

/**
 * @route PUT /unlike-post
 * @description Unlike a post
 * @access Private (requires authentication)
 */
router.put("/unlike-post", asyncHandler(requireSignin), asyncHandler(unlikePost));

export default router;
