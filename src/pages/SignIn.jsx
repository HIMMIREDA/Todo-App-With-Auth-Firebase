import React, { useState, useContext } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext/AuthContext";
import Alert from "../components/Alert";
import GoogleButton from "react-google-button";

function SignIn() {
  const { signIn, currentUser, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    if (pattern.test(e.target.value) === false) {
      setValidationErrors((prevState) => ({
        ...prevState,
        emailError: true,
      }));
    } else {
      setValidationErrors((prevState) => ({
        ...prevState,
        emailError: false,
      }));
    }
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    if (!e.target.value) {
      setValidationErrors((prevState) => ({
        ...prevState,
        passError: true,
      }));
    } else {
      setValidationErrors((prevState) => ({
        ...prevState,
        passError: false,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const error of Object.values(validationErrors)) {
      if (error) {
        return;
      }
    }

    try {
      setLoading(true);
      setValidationErrors({});
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      setSignInError("Login Failed !");
    }

    setLoading(false);
  };

  const handleSignInGoogle = async () => {
    try {
      setLoading(true);
      setValidationErrors({});
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      setSignInError("Login Failed !");
    }

    setLoading(false);
  };

  return currentUser ? (
    <Navigate to="/" />
  ) : (
    <div className="container flex mx-auto justify-center scro">
      <form className="card bg-base-100 shadow-xl" onSubmit={handleSubmit}>
        <div className="card-body space-y-10 ">
          <h2 className="text-center text-3xl md:text-4xl">SignIn</h2>
          <Alert message={signInError} type="error" />

          <div className="space-y-4">
            <label htmlFor="email">Email : </label>
            <input
              type="text"
              placeholder="Email"
              className={`input input-bordered w-full max-w-xs  ${
                validationErrors.emailError !== undefined &&
                (validationErrors.emailError === true
                  ? "input-error"
                  : "input-success")
              }`}
              id="email"
              value={email}
              onChange={handleEmailInput}
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered w-full max-w-xs ${
                validationErrors.passError !== undefined &&
                (validationErrors.passError === true
                  ? "input-error"
                  : "input-success")
              }`}
              id="password"
              value={password}
              onChange={handlePasswordInput}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-1/2 mx-auto"
            disabled={loading}
          >
            Login
          </button>

          <h2 className="text-center">
            No account yet ?{" "}
            <Link to="/signup" className="link link-primary">
              Signup
            </Link>
          </h2>
          <h2 className="text-center">
            <Link to="/forgotpassword" className="link link-primary">
              Forgot password ?
            </Link>
          </h2>
          <GoogleButton
            onClick={handleSignInGoogle}
            className="mx-auto"
            type="dark"
            disabled={loading}
            style={{ backgroundColor: "#6419E6" }}
          />
        </div>
      </form>
    </div>
  );
}

export default SignIn;
