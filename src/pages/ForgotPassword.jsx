import React, { useContext, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext/AuthContext";

import Alert from "../components/Alert";

import { Link } from "react-router-dom";

function ForgotPassword() {
  const { resetPassword, currentUser } = useContext(AuthContext);

  const[email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    for(const error of Object.values(validationErrors)){
        if(error){
            return;
        }
    }

    try{
        setLoading(true);
        setValidationErrors({});
        await resetPassword(email);
        setMessage("check your inbox to reset your password.Check your spam inbox too .");
    }catch(error){
        setError("Password Reset Failed !");
    }

    setLoading(false);
    

  }

  return currentUser ? (
    <Navigate to="/" />
  ) : (
    <div className="container flex mx-auto justify-center ">
      <form className="card bg-base-100 shadow-xl" onSubmit={handleSubmit}>
        <div className="card-body space-y-10 ">
          <h2 className="text-center text-3xl md:text-4xl">Reset Password</h2>
          {error && <Alert message={error} type="error" />}
          {message && <Alert message={message} type="success" />}

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

          <button
            type="submit"
            className="btn btn-primary w-1/2 mx-auto"
            disabled={loading}
          >
            Reset
          </button>

          <h2 className="text-center">
            Have an account ?{" "}
            <Link to="/signin" className="link link-primary">
              SignIn
            </Link>
          </h2>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
