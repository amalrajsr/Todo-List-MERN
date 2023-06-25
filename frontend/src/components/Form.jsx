import React, { useState } from "react";
import "./form.css";
import { Link, useLocation } from "react-router-dom";
function Form({
  header,
  redirect,
  buttonName,
  redirectBtnName,
  handleFunction,
  formType,
}) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.email.length && !error.password.length) {
      handleFunction(user);
    }
  };
  const handleEmail = (e) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setUser({ ...user, email: e.target.value });
    if (emailPattern.test(e.target.value)) {
      setError({ ...error, email: "" });
    } else {
      setError({ ...error, email: "invalid email" });
    }
  };

  const handlePassword = (e) => {
    const passwordPattern = /^\S{5,}$/;
    setUser({ ...user, password: e.target.value });
    if (passwordPattern.test(user.password)) {
      setError({ ...error, password: "" });
    } else {
      setError({
        ...error,
        password: "password must contain atleast 6 character",
      });
    }
  };
  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <h1 className="text-2xl mb-5">{header}</h1>
          <form
            className="form_container"
            method="post"
            onSubmit={handleSubmit}
          >
            <span className={`text-green-400 text-md font-medium my-2`}>
              {location.state?.message || ""}
            </span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input my-2"
              // required
              value={user.email}
              onChange={(e) => handleEmail(e)}
            />
            <div>
              <span className="text-red-400">{error.email}</span>
            </div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className="input"
              value={user.password}
              onChange={(e) => handlePassword(e)}
            />
            <div>
              <span className="text-red-400">{error.password}</span>
            </div>
            <button type="submit" className="green_btn">
              {buttonName}
            </button>
          </form>
          {formType === "login" && (
            <Link to={"/forgot-password"}>
              <p>Forgot Password</p>
            </Link>
          )}
        </div>
        <div className="right">
          <Link to={redirect}>
            <button type="button" className="white_btn">
              {redirectBtnName}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Form;
