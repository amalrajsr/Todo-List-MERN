import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { resetPasswordApi,  } from "../apis/user";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
function ResetPassword() {
  const location = useLocation();
  const token=localStorage.getItem('userToken')
  const [user, setUser] = useState({ email:location.state?.email,pass: "", repass: "" });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if (!location.state) {
      navigate("/");
    } 
  },[])
  const handleSubmit = (e) => {
  e.preventDefault()
  if(user.pass===user.repass){
     setError('')
     if(user.pass.trim().length<6 && user.repass.trim().length<6){
      setError('password must contain atleast 6 character')
     }else{
      setLoading(true)
      resetPasswordApi(user).then(({data})=>{
        if(data.success){
          toast.success('password changed successfully')
          navigate('/')
        }
      }).catch((error)=>{
        toast.error(error.response?.data?.error.message);

      }).finally(()=>setLoading(false))
     }
  }else {
    setError('Password mismatch')
  }
  };
  
  return token? <Navigate to={'/todo'}/>: (
    <div className="w-screen h-screen   flex justify-center item-center">
      <div className="w-1/2 my-auto  bg-slate-300 h-1/2 shadow-md">
        <div className="main w-full">
          <h1 className="text-2xl mb-5  text-center">Reset Password</h1>
          <form className="form_container" onSubmit={handleSubmit}>
            <span className={`text-green-400 text-md font-medium my-2`}></span>
            <input
              type="password"
              placeholder="Enter new password"
              name="pass"
              className={` input my-2`}
              required
              value={user.pass}
              onChange={(e)=>setUser({...user,pass:e.target.value})}
            />
            <div>
              <span className="text-red-400">{error}</span>
            </div>
            <input
              type="password"
              placeholder="Re enter new password"
              name="otp"
              required
              className="input"
              value={user.repass}
              onChange={(e)=>setUser({...user,repass:e.target.value})}
            />
            
            <div></div>
            <button type="submit" className="green_btn">
              {loading ? (
                <ClipLoader color="#ffff" size={20} />
              ) : (
                "Reset Password"
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

export default ResetPassword;
