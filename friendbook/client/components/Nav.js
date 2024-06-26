import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";

/**
 * Navigation component for the Friendbook application.
 * Renders the navigation bar with links based on the user's authentication state.
 *
 * @returns {JSX.Element} The rendered navigation bar.
 */
const Nav = () => {
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const router = useRouter();

  /**
   * Logs out the user by removing the "auth" item from the local storage,
   * resetting the state, and redirecting to the login page.
   */
  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <nav className="nav d-flex justify-content-between"  
    style={{ backgroundColor: "#0866FF" }}>
      <Link  className={`nav-link text-light logo ${current === "/" && "active"}`}
       href="/">
        FRIENDBOOK
      </Link>

      {state !== null ? (
        <>
          <Link href="/user/dashboard"
          className={`nav-link text-light ${ current === "/user/dashboard" && "active"}`}>
             Welcome {state && state.user && state.user.name}
          </Link>

          <a onClick={logout} className="nav-link text-light">
            Logout
          </a>
        </>
      ) : (
        <>
          <Link href="/login"  className={`nav-link text-light ${
                current === "/login" && "active"
              }`}>
            Login
          </Link>

          <Link href="/register" className={`nav-link text-light ${
                current === "/register" && "active"
              }`}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
