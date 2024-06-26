/**
 * Represents the dashboard page for a user.
 * @module pages/user/dashboard
 */

import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import { useRouter, userRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";
import People from "../../components/cards/People";
import Link from "next/link";
import {TeamOutlined} from "@ant-design/icons/lib";

/**
 * Represents the Home component.
 * @returns {JSX.Element} The Home component.
 */
const Home = () => {
  const [state, setState] = useContext(UserContext);
  // state
  const [content, setContent] = useState("");
  // posts
  const [posts, setPosts] = useState([]);
  // people
  const [people, setPeople] = useState([]);
  // route
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
      findPeople();
    }
  }, [state && state.token]);

  /**
   * Fetches the news feed posts.
   * @returns {Promise<void>} A Promise that resolves when the news feed posts are fetched.
   */
  const newsFeed = async () => {
    try {
      const { data } = await axios.get("/news-feed");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Fetches the suggested people to follow.
   * @returns {Promise<void>} A Promise that resolves when the suggested people are fetched.
   */
  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handles the submission of a new post.
   * @param {Event} e - The submit event.
   * @returns {Promise<void>} A Promise that resolves when the post is submitted.
   */
  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/create-post", { content });
      if (data.error) {
        toast.error(data.error);
      } else {
        newsFeed();
        toast.success("Post created");
        setContent("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handles the deletion of a post.
   * @param {Object} post - The post to be deleted.
   * @returns {Promise<void>} A Promise that resolves when the post is deleted.
   */
  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure you want to Delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted");
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handles the follow action on a user.
   * @param {Object} user - The user to be followed.
   * @returns {Promise<void>} A Promise that resolves when the user is followed.
   */
  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      setState({ ...state, user: data });
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      newsFeed();
      toast.success(`Following ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handles sending a friend request to a user.
   * @param {Object} user - The user to send the friend request to.
   * @returns {Promise<void>} A Promise that resolves when the friend request is sent.
   */
  const handleSendFriendRequest = async (user) => {
    try {
      const { data } = await axios.put("/send-friend-request", { _id: user._id });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handles the like action on a post.
   * @param {string} _id - The ID of the post to be liked.
   * @returns {Promise<void>} A Promise that resolves when the post is liked.
   */
  const handleLike = async (_id) => {
    try {
      const { data } = await axios.put("/like-post", { _id });
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handles the unlike action on a post.
   * @param {string} _id - The ID of the post to be unliked.
   * @returns {Promise<void>} A Promise that resolves when the post is unliked.
   */
  const handleUnlike = async (_id) => {
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>Time Line</h1>
          </div>
        </div>
        <div className="row py-3" style={{ backgroundColor: '#F0F2F5' }}>
          <div className="col-md-8">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
            />
            <br />
            <PostList
              posts={posts}
              handleDelete={handleDelete}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
            />
          </div>
          <div className="col-md-4">
            {state && state.user && state.user.following && (
              
              <Link className="following-count" href={`/user/following`}>
                <TeamOutlined className="px-1"/>Following {state.user.following.length} users
              </Link>
            )}
            <People
              people={people}
              handleFollow={handleFollow}
              handleSendFriendRequest={handleSendFriendRequest}
            />
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Home;
