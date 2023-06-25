import axios from "../config/axios";

const getToken = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
    withCredentials: true,
  };
};
export const loginApi = (user) => axios.post("/login", user);
export const registerApi = (user) => axios.post("/register", user);
// todo api
export const addTodoApi = (todo) => axios.post("/todos", { todo }, getToken());
export const fetchTodosApi = () => axios.get("/todos", getToken());
export const updateTodoApi = (todo, id) =>
  axios.patch(`/todos/${id}`, { todo }, getToken());
export const deleteTodoApi = (id) => axios.delete(`/todos/${id}`, getToken());
export const completeTodoApi = (id) =>
  axios.put(`/todos/${id}`, {}, getToken());

// forgot pass
export const sendOtpApi = (email) =>
  axios.post("/forgot-password", { email }, getToken());
export const verifyOtpApi = (otp) =>
  axios.post("/forgot-password/verify-otp", { otp }, getToken());

export const resetPasswordApi=(user)=>axios.post('/reset-password',{user})
