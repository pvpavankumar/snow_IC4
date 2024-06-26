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

  const newsFeed = async () => {
    try {
      const { data } = await axios.get("/news-feed");
      //console.log("user posts => ", data);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };
 
   const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("post => ", content);
    try {
      const { data } = await axios.post("/create-post", { content });
      console.log("create post response => ", data);
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

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure you want to Delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted");
      newsFeed(); // to optimize the code we can filter all the posts which are in state and based on id keep all the posts except deleted one
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (user) => {
    //console.log("add this user to following list ", user);
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      //console.log("handle follow response => ", data);
       // update local storage, update user, keep token
       let auth = JSON.parse(localStorage.getItem("auth"));
       auth.user = data;
       localStorage.setItem("auth", JSON.stringify(auth));
       // update context
       setState({ ...state, user: data });
        // update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      newsFeed();
      toast.success(`Following ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendFriendRequest = async (user) => {
    console.log( user._id);
    try {
      const { data } = await axios.put("/send-friend-request", { _id: user._id });
      //console.log("handle follow response => ", data);
       // update local storage, update user, keep token
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (_id) => {
    // console.log("like this post => ", _id);
    try {
      const { data } = await axios.put("/like-post", { _id });
      console.log("liked", data);
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (_id) => {
    // console.log("unlike this post => ", _id);
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      console.log("unliked", data);
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
        <div className="row py-3">
          <div className="col-md-8">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
            />
             <br />
             <PostList posts={posts}
              handleDelete={handleDelete}
              handleLike={handleLike}
              handleUnlike={handleUnlike}/>
          </div>
          <div className="col-md-4">
          {state && state.user && state.user.following && (
              <Link className="label" href={`/user/following`}>
                Following {state.user.following.length} users
              </Link>
            )}
          <People people={people} 
          handleFollow={handleFollow} 
          handleSendFriendRequest ={handleSendFriendRequest}/>
            </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Home;
