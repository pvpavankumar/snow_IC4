import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PostForm from "../../../components/forms/PostForm";
import UserRoute from "../../../components/routes/UserRoute";
import { toast } from "react-toastify";

/**
 * Component for editing a post.
 * @returns {JSX.Element} The EditPost component.
 */
const EditPost = () => {
  const [post, setPost] = useState({});
  // state
  const [content, setContent] = useState("");

  const router = useRouter();
  const _id = router.query._id;

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  /**
   * Fetches the post data from the server.
   */
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
      setContent(data.content);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handles the form submission for editing the post.
   * @param {Event} e - The form submit event.
   */
  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/update-post/${_id}`, {
        content
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post Edited successfully!!!");
        router.push("/user/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>Edit Post</h1>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8 offset-md-2">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
            />
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default EditPost;
