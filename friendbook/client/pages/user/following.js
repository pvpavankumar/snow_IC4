import { useContext, useState, useEffect } from "react";
import { Avatar, List } from "antd/lib";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons/lib";
import Link from "next/link";
import { toast } from "react-toastify";

const Following = () => {
  const [state, setState] = useContext(UserContext);
  // state
  const [people, setPeople] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (state && state.token) fetchFollowing();
  }, [state && state.token]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return ''; // Handle empty strings
    return string.charAt(0).toUpperCase();
  };

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get("/user-following");
      console.log("following => ", data);
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

 

  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      // update context
      setState({ ...state, user: data });
      // update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      toast.error(`Unfollowed ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row col-md-6 offset-md-3">
      {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
             avatar={<Avatar size={40} style={{ backgroundColor: '#87d068' }}>
             {capitalizeFirstLetter(user.name[0])}
             </Avatar>}
              title={
                <div className="d-flex justify-content-between">
                  {user.name}{" "}
                  <span
                    onClick={() => handleUnfollow(user)}
                    className="text-primary pointer"
                  >
                    Unfollow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />

      <Link href="/user/dashboard" className="d-flex justify-content-center pt-5">
          <RollbackOutlined />
      </Link>
    </div>
  );
};

export default Following;
