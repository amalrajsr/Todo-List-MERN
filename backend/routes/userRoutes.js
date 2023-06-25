const express = require("express");
const userController = require("../controller/userController");
const todoController = require("../controller/todoController");
const authChecker = require("../middleware/authHandler");
const router = express();

router.post("/register", userController.handleRegister);
router.post("/login", userController.handleLogin);

// todo routes
router.use(authChecker); // authentication middleware
router
  .route("/todos")
  .post(todoController.addTodo)
  .get(todoController.fetchTodos);
router
  .route("/todos/:id")
  .patch(todoController.updateTodo)
  .put(todoController.markTodo)
  .delete(todoController.deleteTodo);
module.exports = router;
