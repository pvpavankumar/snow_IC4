/**
 * Login page component.
 * @module Login
 */

import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { useRouter } from "next/router";
import { UserContext } from "../context";

/**
 * Login component.
 * @returns {JSX.Element} Login page JSX element.
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(UserContext);

  const router = useRouter();

  /**
   * Handles the form submission.
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      setState({
        user: data.user,
        token: data.token,
      });
      window.localStorage.setItem("auth", JSON.stringify(data));
      router.push("/user/dashboard");
    } catch (err) {
      const status = err.response?.status;
      const body = err.response?.data;
      const isPlainMessage = typeof body === "string" &&
        body.trim().length > 0 && body.length <= 300 && !/[<>]/.test(body);
      const message = !err.response
        ? "Unable to connect. Please check your connection and try again."
        : status >= 500
          ? "The server could not complete your request. Please try again later."
          : isPlainMessage ? body : "Unable to complete your request. Please try again.";
      toast.error(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state?.token) router.replace("/user/dashboard");
  }, [state?.token, router]);

  return (
    <div className="container-fluid">

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Not yet registered?{" "}
            <Link className="btn btn-success" href="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;