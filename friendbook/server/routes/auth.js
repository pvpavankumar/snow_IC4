import express from "express";

const router = express.Router();

//middlewares
import { requireSignin } from "../middlewares";

// controllers
import { register, login, currentUser, findPeople,addFollower,
    userFollow, userFollowing,removeFollower, userUnfollow, 
    sendFriendRequest, acceptFriendRequest, removeFriend, getFriendsPosts} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignin, currentUser);
router.get("/find-people", requireSignin, findPeople);
router.put("/user-follow", requireSignin, addFollower, userFollow);
router.put("/user-unfollow", requireSignin, removeFollower, userUnfollow);
router.get("/user-following", requireSignin, userFollowing);

router.post('/send-friend-request', requireSignin, sendFriendRequest);
router.post('/accept-friend-request', requireSignin, acceptFriendRequest);
router.delete('/remove-friend', requireSignin, removeFriend);
router.get('/friends-posts', requireSignin, getFriendsPosts);

  module.exports= router;