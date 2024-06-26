/**
 * Represents a post in the Friendbook application.
 * @typedef {Object} Post
 * @property {Object} content - The content of the post.
 * @property {boolean} content.required - Indicates if the content is required.
 * @property {ObjectId} postedBy - The user who posted the post.
 * @property {string} image.url - The URL of the image associated with the post.
 * @property {string} image.public_id - The public ID of the image associated with the post.
 * @property {ObjectId[]} likes - The users who liked the post.
 * @property {Object[]} comments - The comments on the post.
 * @property {string} comments.text - The text of the comment.
 * @property {Date} comments.created - The date the comment was created.
 * @property {ObjectId} comments.postedBy - The user who posted the comment.
 */
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    content: {
      type: {},
      required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      url: String,
      public_id: String,
    },
    likes: [{ type: ObjectId, ref: "user" }],
    comments: [
      {
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { 
    timestamps: true //Generates the created at and updated at time stamps
   }
);

export default mongoose.model("Post", postSchema);
