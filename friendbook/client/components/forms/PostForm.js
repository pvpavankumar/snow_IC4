/**
 * A form component for creating posts.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.content - The content of the post.
 * @param {function} props.setContent - A function to update the content of the post.
 * @param {function} props.postSubmit - A function to handle the post submission.
 * @returns {JSX.Element} The PostForm component.
 */
// We use dynamic when we are using a npm package which supports client side and not server side 
import dynamic from "next/dynamic";
// ssr: Server side rendering is false since we need it only in client side
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// We can use props as well to read the properties here.
const PostForm = ({ content, setContent, postSubmit }) => {
        return (
          <div className="card">
            <div className="card-body pb-3">
              <form className="form-group">
                <ReactQuill
                 theme="snow"
                  value={content}
                  onChange={(e) => setContent(e)}
                  className="form-control"
                  placeholder="Write something..."
                />
              </form>
            </div>
      
            <div className="card-footer" style={{ backgroundColor: '#FFF' }}>
              <button  disabled={!content}
              onClick={postSubmit} 
              className="btn btn-primary px-4 mt-1">
                Post
              </button>
            </div>
          </div>
        );
      };
      
export default PostForm;