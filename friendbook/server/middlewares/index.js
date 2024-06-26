import Post from "../models/post";
const { expressjwt } = require("express-jwt");

export const requireSignin  = expressjwt({
  secret: process.env.JWT_SECRET, // your secret key
  algorithms: ["HS256"], // your algorithm
});

module.exports = requireSignin;

export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    // console.log("POST in EDITDELETE MIDDLEWARE => ", post);
    if (req.auth._id != post.postedBy) {
      return res.status(400).send("Unauthorized");
    } else {
      next(); // call back to execute the controller function 
    }
  } catch (err) {
    console.log(err);
  }
};
