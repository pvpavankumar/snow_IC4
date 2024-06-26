import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  //  console.log("REGISTER ENDPOINT => ", req.body);
  const { name, email, password, secret } = req.body;
  // validation
  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is required and should be 6 characters long");
  if (!secret) return res.status(400).send("Answer is required");
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).send("Email is taken");
  // hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword, secret });
  try {
    await user.save();
    // console.log("REGISTERED USE => ", user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("No user found");
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong password");
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const currentUser = async (req, res) => {
    console.log(req.auth._id);
  try {
    const user = await User.findById(req.auth._id);
    // res.json(user);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const findPeople = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    // user.following
    let following = user.following;
    following.push(user._id);
    const people = await User.find({ _id: { $nin: following } })
    .select("-password -secret")
    .limit(10);
    res.json(people);
  } catch (err) {
    console.log(err);
  }
};

// middleware
export const addFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $addToSet: { followers: req.auth._id },
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

export const userFollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $addToSet: { following: req.body._id },
      },
      { new: true }
    ).select("-password -secret");
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const userFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    const following = await User.find({ _id: user.following }).limit(50);
    res.json(following);
  } catch (err) {
    console.log(err);
  }
};

/// middleware
export const removeFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $pull: { followers: req.auth._id },
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

export const userUnfollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $pull: { following: req.body._id },
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const sendFriendRequest = async (req, res) => {
  const userId  = req.body._id;
  const currentUserId = req.auth._id;
  console.log('send friend request', userId);
  console.log('send friend request', currentUserId);

  // try {
  //   const user = await User.findById(req.body._id);
  //   const currentUser = await User.findById(currentUserId);

  //   if (!user) return res.status(404).json({ error: 'User not found' });

  //   if (currentUser.friendRequestsSent.includes(req.body._id)) {
  //     return res.status(400).json({ error: 'Friend request already sent' });
  //   }

  //   currentUser.friendRequestsSent.push(req.body._id);
  //   user.friendRequestsReceived.push(currentUserId);

  //   await currentUser.save();
  //   await user.save();

  //   res.json({ message: 'Friend request sent' });
  // } catch (err) {
  //   res.status(500).json({ error: 'Server error' });
  // }
};

export const acceptFriendRequest = async (req, res) => {
  const userId  = req.body._id;
  const currentUserId = req.auth._id;
  console.log('accept friend request', userId);
  console.log('accept friend request', currentUserId);

  // try {
  //   const user = await User.findById(userId);
  //   const currentUser = await User.findById(currentUserId);

  //   if (!user) return res.status(404).json({ error: 'User not found' });

  //   if (!currentUser.friendRequestsReceived.includes(userId)) {
  //     return res.status(400).json({ error: 'No friend request from this user' });
  //   }

  //   currentUser.friends.push(userId);
  //   user.friends.push(currentUserId);

  //   currentUser.friendRequestsReceived.pull(userId);
  //   user.friendRequestsSent.pull(currentUserId);

  //   await currentUser.save();
  //   await user.save();

  //   res.json({ message: 'Friend request accepted' });
  // } catch (err) {
  //   res.status(500).json({ error: 'Server error' });
  // }
};

export const removeFriend = async (req, res) => {
  const userId  = req.body._id;
  const currentUserId = req.auth._id;
  console.log('remove friend request', userId);
  console.log('remove friend request', currentUserId);

  // try {
  //   const user = await User.findById(userId);
  //   const currentUser = await User.findById(currentUserId);

  //   if (!user) return res.status(404).json({ error: 'User not found' });

  //   currentUser.friends.pull(userId);
  //   user.friends.pull(currentUserId);

  //   await currentUser.save();
  //   await user.save();

  //   res.json({ message: 'Friend removed' });
  // } catch (err) {
  //   res.status(500).json({ error: 'Server error' });
  // }
};

export const getFriendsPosts = async (req, res) => {
  const currentUserId = req.auth._id;
  console.log('getFriendsPosts', currentUserId);

  // try {
  //   const currentUser = await User.findById(currentUserId).populate('friends');
  //   const friendsPosts = await Post.find({ author: { $in: currentUser.friends } }).populate('author');

  //   res.json(friendsPosts);
  // } catch (err) {
  //   res.status(500).json({ error: 'Server error' });
  // }
};