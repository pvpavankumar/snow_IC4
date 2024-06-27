/**
 * Represents the Home page component.
 * @component
 */
import { useContext } from "react";
import { UserContext } from "../context";

const Home = () => {
  const [state, setState] = useContext(UserContext);
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="display-1 text-center">Home page</h1>
            <p className="lead text-center">
              Welcome to the Friendbook application.
            </p>
            <div>
        <h2 className="text-center mt-5">Features of Friendbook</h2>
        <ul className="list-unstyled">
          <li><strong>User Registration and Sign-In:</strong> Easily register and create your account with just a few clicks. Our secure sign-in process ensures that your data is protected.</li>
          <li><strong>Create and Edit Posts:</strong> Share your thoughts, experiences, and moments. You can easily create and edit your posts.</li>
          <li><strong>Like and Unlike Posts:</strong> Show your appreciation for content with a simple like. If you change your mind, you can unlike the post with just as much ease.</li>
          <li><strong>Follow and Unfollow Users:</strong> Stay connected with what matters to you. Follow suggested users to see their updates in your feed. You can unfollow at any time if you choose.</li>
        </ul>
      </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;