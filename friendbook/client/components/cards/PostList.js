import { useContext } from "react";
import renderHTML from 'react-render-html';
import moment from "moment";
import {Avatar} from "antd/lib";
import {ClockCircleOutlined, LikeOutlined,LikeFilled, MessageOutlined, MessageFilled, EditOutlined, DeleteOutlined } from "@ant-design/icons/lib";
import { UserContext } from "../../context";
import { useRouter } from "next/router";

/**
 * Renders a list of posts.
 * @param {Object} props - The component props.
 * @param {Array} props.posts - The array of posts to render.
 * @param {Function} props.handleDelete - The function to handle post deletion.
 * @param {Function} props.handleLike - The function to handle post liking.
 * @param {Function} props.handleUnlike - The function to handle post unliking.
 * @returns {JSX.Element} The rendered component.
 */
const PostList = ({ posts, handleDelete, handleLike, handleUnlike }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  /**
   * Capitalizes the first letter of a string.
   * @param {string} string - The input string.
   * @returns {string} The string with the first letter capitalized.
   */
  const capitalizeFirstLetter = (string) => {
    if (!string) return ''; // Handle empty strings
    return string.charAt(0).toUpperCase();
  };

  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-5">
            <div className="card-header" style={{ backgroundColor: "#fff" }}>
              <Avatar size={40} style={{ backgroundColor: '#87d068' }}>
                {capitalizeFirstLetter(post.postedBy.name[0])}
              </Avatar> {" "}
              <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                {post.postedBy.name}
              </span>
              <span className="pt-2 ml-3 float-end" style={{ marginLeft: "1rem" }}>
                <ClockCircleOutlined />
                <span className='ps-2'>{moment(post.createdAt).fromNow()}</span>
              </span>
            </div>
            <div className="card-body">
              {renderHTML(post.content)}
            </div>
            <div className="card-footer" style={{ backgroundColor: "#fff" }}>
              <div className="d-flex pt-3">
                {post.likes.includes(state.user._id) ? (
                  <LikeFilled
                    onClick={() => handleUnlike(post._id)}
                    className="pt-2 h5 px-2"
                  />
                ) : (
                  <LikeOutlined
                    onClick={() => handleLike(post._id)}
                    className="pt-2 h5 px-2"
                  />
                )}
                <div className="pt-2 pl-3" style={{ marginRight: "1rem" }}>
                  {post.likes.length} likes
                </div>
                {state && state.user && state.user._id === post.postedBy._id && (
                  <>
                    <EditOutlined
                      onClick={() => router.push(`/user/post/${post._id}`)}
                      className="pt-2 h5 px-2 mx-auto"
                    />
                    <DeleteOutlined
                      onClick={() => handleDelete(post)}
                      className=" pt-2 h5 px-2"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PostList;