import Post from "../models/post";
import { expressjwt } from "express-jwt";
export const requireSignin = (req, res, next) => {
  if (!process.env.JWT_SECRET) return res.status(503).send("Authentication is not configured.");
  return expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })(req, res, next);
};
export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (!post) return res.status(404).send("Post not found");
    if (String(post.postedBy) !== req.auth._id) return res.status(403).send("Unauthorized");
    next();
  } catch (error) { next(error); }
};
