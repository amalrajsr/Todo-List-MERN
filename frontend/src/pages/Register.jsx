import React, { useState } from "react";
import Form from "../components/Form";
import ClipLoader from "react-spinners/ClipLoader";
import { registerApi } from "../apis/user";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
function Register() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("userToken");

  const navigate=useNavigate()
  const handleRegister = (user) => {
    setLoading(true)
    registerApi(user).then(({ data }) => {
      console.log(data)
      navigate('/',{state:{message:'successfully registered please login'}})
    }).catch((error)=>{
      toast.error(error.response?.data?.error.message)
    }).finally(()=>{
       setLoading(false)
       
    })
  };
  return (
   token ? <Navigate to={'/todo'}/> :
      <Form
        header={"Register your account"}
        redirect={"/"}
        buttonName={
          loading ? <ClipLoader color="#ffff" size={20} /> : "Sign up"
        }
        redirectBtnName={"Log in"}
        handleFunction={handleRegister}
      />
  );
}

export default Register;
