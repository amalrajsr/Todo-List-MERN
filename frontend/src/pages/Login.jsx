import React, { useState } from "react";
import Form from "../components/Form";
import { loginApi } from "../apis/user";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const handleLogin = (user) => {
    setLoading(true);
    loginApi(user)
      .then(({ data }) => {
        if (data.success && data.token) {
          localStorage.setItem("userToken", data.token);
          navigate("/todo");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.error.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    token ? (
      <Navigate to={"/todo"} />
    ) :(
      <Form
        header={"Login to your account"}
        redirect={"/register"}
        buttonName={loading ? <ClipLoader color="#ffff" size={20} /> : "Login"}
        redirectBtnName={"Sign up"}
        handleFunction={handleLogin}
      />
    )
  );
}

export default Login;
