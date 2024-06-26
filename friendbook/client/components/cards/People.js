
import { useContext } from "react";
import { Avatar, List } from "antd/lib";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";

/**
 * Renders a list of people with their avatars and names.
 *
 * @component
 * @param {Object[]} people - An array of people objects.
 * @param {Function} handleFollow - A function to handle the follow action.
 * @param {Function} handleSendFriendRequest - A function to handle sending friend requests.
 * @returns {JSX.Element} The rendered list of people.
 */
const People = ({ people, handleFollow, handleSendFriendRequest }) => {
  const [state] = useContext(UserContext);

  const router = useRouter();

  /**
   * Capitalizes the first letter of a string.
   *
   * @param {string} string - The input string.
   * @returns {string} The input string with the first letter capitalized.
   */
  const capitalizeFirstLetter = (string) => {
    if (!string) return ''; // Handle empty strings
    return string.charAt(0).toUpperCase();
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar size={40} style={{ backgroundColor: '#87d068' }}>
                  {capitalizeFirstLetter(user.name[0])}
                </Avatar>
              }
              title={
                <div className="d-flex justify-content-between">
                  {user.name} 
                  <span 
                    className="btn btn-primary"
                    onClick={() => handleFollow(user)}
                  >
                    Follow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default People;
