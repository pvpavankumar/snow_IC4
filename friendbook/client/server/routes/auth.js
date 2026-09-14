import asyncHandler from "../async-handler";
import express from "express";

const router = express.Router();

/**
 * @module authRoutes
 * @description Routes related to user authentication and authorization
 */

//middlewares
import { requireSignin } from "../middlewares";

// controllers
import { 
  register, 
  login, 
  currentUser, 
  findPeople, 
  addFollower,
  userFollow, 
  userFollowing, 
  removeFollower, 
  userUnfollow, 
  sendFriendRequest, 
  acceptFriendRequest, 
  removeFriend, 
  getFriendsPosts 
} from "../controllers/auth";

/**
 * @route POST /register
 * @description Register a new user
 */
router.post("/register", asyncHandler(register));

/**
 * @route POST /login
 * @description User login
 */
router.post("/login", asyncHandler(login));

/**
 * @route GET /current-user
 * @description Get the current logged-in user
 * @access Private
 */
router.get("/current-user", asyncHandler(requireSignin), asyncHandler(currentUser));

/**
 * @route GET /find-people
 * @description Find people to connect with
 * @access Private
 */
router.get("/find-people", asyncHandler(requireSignin), asyncHandler(findPeople));

/**
 * @route PUT /user-follow
 * @description Add a follower to the user's profile
 * @access Private
 */
router.put("/user-follow", asyncHandler(requireSignin), asyncHandler(addFollower), asyncHandler(userFollow));

/**
 * @route PUT /user-unfollow
 * @description Remove a follower from the user's profile
 * @access Private
 */
router.put("/user-unfollow", asyncHandler(requireSignin), asyncHandler(removeFollower), asyncHandler(userUnfollow));

/**
 * @route GET /user-following
 * @description Get the list of users the current user is following
 * @access Private
 */
router.get("/user-following", asyncHandler(requireSignin), asyncHandler(userFollowing));

/**
 * @route POST /send-friend-request
 * @description Send a friend request to another user
 * @access Private
 */
router.post('/send-friend-request', asyncHandler(requireSignin), asyncHandler(sendFriendRequest));

/**
 * @route POST /accept-friend-request
 * @description Accept a friend request from another user
 * @access Private
 */
router.post('/accept-friend-request', asyncHandler(requireSignin), asyncHandler(acceptFriendRequest));

/**
 * @route DELETE /remove-friend
 * @description Remove a friend from the user's friend list
 * @access Private
 */
router.delete('/remove-friend', asyncHandler(requireSignin), asyncHandler(removeFriend));

/**
 * @route GET /friends-posts
 * @description Get posts from friends
 * @access Private
 */
router.get('/friends-posts', asyncHandler(requireSignin), asyncHandler(getFriendsPosts));

export default router;
