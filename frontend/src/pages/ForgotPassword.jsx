import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { sendOtpApi, verifyOtpApi } from "../apis/user";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

function ForgotPassword() {
  const token = localStorage.getItem("userToken");
  const [otp, setOtp] = useState(false);
  const [user, setUser] = useState({ email: "", otp: null });
  const [error, setError] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp) {
      setLoading(true);
      verifyOtpApi(user.otp)
        .then(({ data }) => {
          toast.success(data);
          data.success &&
            navigate("/reset-password", { state: { email: user.email } });
        })
        .catch((error) => {
          toast.error(error.response?.data?.error.message);
        })
        .finally(() => setLoading(false));
    } else {
      if (!error.length && !loading) {
        setLoading(true);
        sendOtpApi(user.email)
          .then(({ data }) => {
            data.success && setOtp(true);
          })
          .catch((error) => {
            toast.error(error.response?.data?.error.message);
          })
          .finally(() => setLoading(false));
      }
    }
  };
  const handleEmail = (e) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setUser({ ...user, email: e.target.value });
    if (emailPattern.test(user.email)) {
      setError({ ...error, email: "" });
    } else {
      setError({ ...error, email: "invalid email" });
    }
  };
  return token ? (
    <Navigate to={"/todo"} />
  ) : (
    <div className="w-screen h-screen   flex justify-center item-center">
      <div className="w-1/2 my-auto  bg-slate-300 h-1/2 shadow-md">
        <div className="main w-full">
          <h1 className="text-2xl mb-5  text-center">Reset Password</h1>
          <form className="form_container" onSubmit={handleSubmit}>
            <span className={`text-green-400 text-md font-medium my-2`}></span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className={`${otp && "disabled"} input my-2`}
              required
              value={user.email}
              onChange={(e) => handleEmail(e)}
            />
            <div>
              <span className="text-red-400">{error.email}</span>
            </div>
            {otp && (
              <input
                type="number"
                placeholder="Enter your otp"
                name="otp"
                required
                className="input"
                value={user.otp}
                onChange={(e) => setUser({ ...user, otp: e.target.value })}
              />
            )}
            <div>
            </div>
            <button type="submit" className="green_btn">
              {loading ? (
                <ClipLoader color="#ffff" size={20} />
              ) : otp ? (
                "verfiy otp"
              ) : (
                "send otp"
              )}
            </button>
          </form>

          <Link to={"/"}>
            <p className="text-center">Back to Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
