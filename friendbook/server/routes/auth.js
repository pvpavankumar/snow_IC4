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
router.post("/register", register);

/**
 * @route POST /login
 * @description User login
 */
router.post("/login", login);

/**
 * @route GET /current-user
 * @description Get the current logged-in user
 * @access Private
 */
router.get("/current-user", requireSignin, currentUser);

/**
 * @route GET /find-people
 * @description Find people to connect with
 * @access Private
 */
router.get("/find-people", requireSignin, findPeople);

/**
 * @route PUT /user-follow
 * @description Add a follower to the user's profile
 * @access Private
 */
router.put("/user-follow", requireSignin, addFollower, userFollow);

/**
 * @route PUT /user-unfollow
 * @description Remove a follower from the user's profile
 * @access Private
 */
router.put("/user-unfollow", requireSignin, removeFollower, userUnfollow);

/**
 * @route GET /user-following
 * @description Get the list of users the current user is following
 * @access Private
 */
router.get("/user-following", requireSignin, userFollowing);

/**
 * @route POST /send-friend-request
 * @description Send a friend request to another user
 * @access Private
 */
router.post('/send-friend-request', requireSignin, sendFriendRequest);

/**
 * @route POST /accept-friend-request
 * @description Accept a friend request from another user
 * @access Private
 */
router.post('/accept-friend-request', requireSignin, acceptFriendRequest);

/**
 * @route DELETE /remove-friend
 * @description Remove a friend from the user's friend list
 * @access Private
 */
router.delete('/remove-friend', requireSignin, removeFriend);

/**
 * @route GET /friends-posts
 * @description Get posts from friends
 * @access Private
 */
router.get('/friends-posts', requireSignin, getFriendsPosts);

module.exports = router;
