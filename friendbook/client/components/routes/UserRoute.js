/**
 * A component that renders its children only if the user is authenticated.
 * Otherwise, it redirects the user to the login page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The children components to render.
 * @returns {ReactNode} - The rendered component.
 */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../context";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const [state] = useContext(UserContext);

  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  /**
   * Fetches the current user's data from the server.
   * If the request is successful, sets the `ok` state to `true`.
   * Otherwise, redirects the user to the login page.
   *
   * @async
   * @function getCurrentUser
   * @returns {Promise<void>}
   */
  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/current-user`);
      if (data.ok) setOk(true);
    } catch (err) {
      router.push("/login");
    }
  };

  process.browser &&
    state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return !ok ? (
    "Loading"
  ) : (
    <> {children}</>
  );
};

export default UserRoute;
