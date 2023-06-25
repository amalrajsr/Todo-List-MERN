const express = require("express");
const userController = require("../controller/userController");
const todoController = require("../controller/todoController");
const passwordcontroller=require('../controller/passwordController')
const authChecker = require("../middleware/authHandler");
const router = express();

router.post("/register", userController.handleRegister);
router.post("/login", userController.handleLogin);

//forgot password routes
router.post('/forgot-password',passwordcontroller.sendOtp)
router.post('/forgot-password/verify-otp',passwordcontroller.verifyOtp)
router.post('/reset-password',passwordcontroller.resetPassword)
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
