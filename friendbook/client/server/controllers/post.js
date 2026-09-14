import sanitizeHtml from "sanitize-html";
import Post from "../models/post";
import User from "../models/user";

/**
 * Create a new post.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The created post.
 */
export const createPost = async (req, res) => {
  const { content } = req.body;
  if (typeof content !== "string" || !content.trim()) {
    return res.json({
      error: "Content is required",
    });
  }
  try {
    const post = new Post({ content: sanitizeHtml(content), postedBy: req.auth._id });
    await post.save();
    res.json(post);
  } catch (err) {
    return res.status(400).send("Unable to complete the request.");
    res.sendStatus(400);
  }
};

/**
 * Get posts by a specific user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} The posts by the user.
 */
export const postsByUser = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(posts);
  } catch (err) {
    return res.status(400).send("Unable to complete the request.");
  }
};

/**
 * Get a specific post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The post.
 */
export const userPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    res.json(post);
  } catch (err) {
    return res.status(400).send("Unable to complete the request.");
  }
};

/**
 * Update a specific post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The updated post.
 */
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, { content: sanitizeHtml(String(req.body.content || "")) }, {
      new: true,
    });
    res.json(post);
  } catch (err) {
    return res.status(400).send("Unable to complete the request.");
  }
};

/**
 * Delete a specific post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The result of the deletion.
 */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params._id);
    res.json({ ok: true });
  } catch (err) {
    return res.status(400).send("Unable to complete the request.");
  }
};

/**
 * Get the news feed of posts for the authenticated user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} The news feed posts.
 */
export const newsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    let following = user.following;
    following.push(req.auth._id);

    const posts = await Post.find({ postedBy: { $in: following } })
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 })
      .limit(10);


    res.json(posts);
  } catch (err) {
    return res.status(400).send("Unable to complete the request.");
  }
};

/**
 * Like a specific post.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The updated post with the like.
 */
export const likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $addToSet: { likes: req.auth._id },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    return res.status(400).send("Unable to complete the request.");
  }
};

/**
 * Unlike a specific post.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The updated post without the like.
 */
export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $pull: { likes: req.auth._id },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    return res.status(400).send("Unable to complete the request.");
  }
};
