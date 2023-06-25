import React, { useEffect, useState } from "react";
import {
  addTodoApi,
  completeTodoApi,
  deleteTodoApi,
  fetchTodosApi,
  updateTodoApi,
} from "../apis/user";
import TodoBtn from "../components/TodoBtn";
import { Navigate, useNavigate } from "react-router-dom";

function Todo() {
  const token= localStorage.getItem('userToken')
  const navigate=useNavigate()
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [edit, setEdit] = useState(null); // state for handling to editing
  useEffect(() => {
    fetchTodosApi() // api for fetching todo
      .then(({ data }) => {
        data.todos?.length && setTodos(data.todos);
      })
      .catch((error) => {});
  }, [fetch]);

  //add
  const addTodo = (e) => {
    e.preventDefault();
    if (currentTodo.trim().length) {
      setLoading(true);
      addTodoApi(currentTodo)
        .then(({ data }) => {
          setCurrentTodo("");
          data.success && setFetch(!fetch);
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };
  // update
  const updateTodo = (e) => {
    e.preventDefault();
    if (currentTodo.trim().length) {
      updateTodoApi(currentTodo, edit).then(({ data }) => {
        console.log(data);
        setCurrentTodo("");
        setEdit(null)
        data.success && setFetch(!fetch);
      });
    }
  };
//delete
  const deleteTodo = (id) => {
    deleteTodoApi(id).then(({ data }) => {
      data.success && setFetch(!fetch);
    });
  };

  // complete
  const completeTodo = (id) => {
    completeTodoApi(id).then(({ data }) => {
      data.success && setFetch(!fetch);
    });
  };

  //logout
  const logout=()=>{
    localStorage.removeItem('userToken')
    navigate('/')
  }
  return (
    !token? <Navigate to={'/'}/>: 
    <div className=" mt-14 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow-md px-6  w-full lg:w-3/4 lg:w-3/4  ">
        <div className="mb-4">
          <div className="flex justify-between">
            <h1 className="text-grey-darkest">Todo List</h1>
            <button className="text-grey-darkest" onClick={logout}>Log out</button>
          </div>
          <div className=" mt-4">
            <form className="flex" onSubmit={edit ? updateTodo : addTodo}>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
                value={currentTodo}
                onChange={(e) => setCurrentTodo(e.target.value)}
              />
              <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-blue-300">
                {edit ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
        <div className="max-h-[100px] overflow-y-hidden ">
          {todos.map((item) => {
            return (
              <div key={item._id} className="flex mb-2 items-center">
                <p className={`${item.status ?'line-through':''} w-full text-grey-darkest`}>{item.task}</p>
               <TodoBtn customStyle={item.status?'disabled bg-gray-300 ':'' } handleFunction={()=>completeTodo(item._id)}>Done</TodoBtn>
                <TodoBtn
                  handleFunction={() => {
                    setEdit(item._id);
                    setCurrentTodo(item.task);
                  }}
                >
                  Edit
                </TodoBtn>
                <TodoBtn handleFunction={() => deleteTodo(item._id)}>
                  Remove
                </TodoBtn>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Todo;
