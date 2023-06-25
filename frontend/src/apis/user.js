import axios from "../config/axios";


const getToken = () => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    };
  };
export const loginApi= (user)=>axios.post('/login',user)
export const registerApi= (user)=>axios.post('/register',user)
// todo api
export const addTodoApi=(todo)=>axios.post('/todos',{todo},getToken())
export const fetchTodosApi=()=>axios.get('/todos',getToken())
export const updateTodoApi=(todo,id)=>axios.patch(`/todos/${id}`,{todo},getToken())
export const deleteTodoApi=(id)=>axios.delete(`/todos/${id}`,getToken())
export const completeTodoApi=(id)=>axios.put(`/todos/${id}`,{},getToken())