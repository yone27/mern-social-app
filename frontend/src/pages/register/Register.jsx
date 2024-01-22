import { useContext, useRef } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import client from "../../axios";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await client.post("auth/register", user);
        history("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Yonesocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              ref={username}
              name="username"
              className="loginInput"
            />
            <input
              placeholder="Email"
              name="email"
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              ref={password}
              name="password"
              className="loginInput"
              min={"6"}
            />
            <input
              placeholder="Password Again"
              ref={passwordAgain}
              name="passwordAgain"
              className="loginInput"
              min={"6"}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login" className="loginRegisterButton">
              Log into Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
