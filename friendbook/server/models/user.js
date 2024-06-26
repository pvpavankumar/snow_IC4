/**
 * @file User Model
 * @description Defines the User schema for the Friendbook application.
 * @module User
 */

import mongoose from "mongoose";
const { Schema } = mongoose;

/**
 * @typedef {Object} User
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} secret - The secret of the user.
 * @property {Object} about - Additional information about the user.
 * @property {string} photo - The photo URL of the user.
 * @property {Array.<Schema.ObjectId>} following - The users that the user is following.
 * @property {Array.<Schema.ObjectId>} followers - The users that are following the user.
 * @property {Array.<Schema.ObjectId>} friends - The friends of the user.
 * @property {Array.<Schema.ObjectId>} friendRequestsSent - The friend requests sent by the user.
 * @property {Array.<Schema.ObjectId>} friendRequestsReceived - The friend requests received by the user.
 * @property {Date} createdAt - The timestamp when the user was created.
 * @property {Date} updatedAt - The timestamp when the user was last updated.
 */

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    secret: {
      type: String,
      required: true,
    },
    about: {},
    photo: String,
    following: [{ type: Schema.ObjectId, ref: "User" }],
    followers: [{ type: Schema.ObjectId, ref: "User" }],
    friends: [{ type: Schema.ObjectId, ref: "User" }],
    friendRequestsSent: [{ type: Schema.ObjectId, ref: "User" }],
    friendRequestsReceived: [{ type: Schema.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);