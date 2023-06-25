const expressAsyncHandler = require("express-async-handler");
const AppError = require("../utils/error");
const todoModel = require("../model/todoModel");

const fetchTodos = expressAsyncHandler(async (req, res, next) => {
  const todoList = await todoModel.findOne(
    { userId: req.id },
    { todos: 1, _id: 0 }
  );
  todoList.todos.reverse();
  res.json(todoList);
});

const addTodo = expressAsyncHandler(async (req, res, next) => {
  const { todo } = req.body;

  if (!todo) throw new AppError(400, "bad request");
  const todoExist = await todoModel.findOne({ userId: req.id });
  let success = true;
  if (!todoExist) {
    // creating new todo list if not exist
    const newTodo = new todoModel({
      userId: req.id,
      todos: [{ task: todo }],
    });
    await newTodo.save();
  } else {
    //updating existing todo list
    const updateStatus = await todoModel.updateOne(
      { userId: req.id },
      { $push: { todos: { task: todo } } }
    );
    updateStatus.modifiedCount ? (success = true) : (success = false);
  }
  res.json({ success });
});

const updateTodo = expressAsyncHandler(async (req, res, next) => {
  if (!req.params.id || !req.body.todo)
    throw new AppError(400, "Invalid request");
  const updateStatus = await todoModel.updateOne(
    { userId: req.id, "todos._id": req.params.id },
    { $set: { "todos.$.task": req.body.todo } }
  );
  let success;
  updateStatus.modifiedCount ? (success = true) : (success = false);
  res.json({ success });
});

const deleteTodo = expressAsyncHandler(async (req, res, next) => {
  if (!req.params.id) throw new AppError(400, "Invalid request");
  const deleteStatus = await todoModel.updateOne(
    { userId: req.id },
    { $pull: { todos: { _id: req.params.id } } }
  );
  let success;
  deleteStatus.modifiedCount ? (success = true) : (success = false);
  res.json({ success });
});

// mark todo as complete or not
const markTodo =expressAsyncHandler(async (req, res, next) => {
    
    if (!req.params.id)
      throw new AppError(400, "Invalid request");
    const updateStatus = await todoModel.updateOne(
      { userId: req.id, "todos._id": req.params.id },
      { $set: { "todos.$.status": true } }
    );
    let success;
    updateStatus.modifiedCount ? (success = true) : (success = false);
    res.json({ success });
  });
module.exports = {
  addTodo,
  fetchTodos,
  updateTodo,
  deleteTodo,
  markTodo
};
