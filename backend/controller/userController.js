const userModel = require("../model/userModel");
const expressAsyncHandler = require("express-async-handler");
const AppError = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const handleRegister = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError(400, "invalid request");
  const userExist = await userModel.findOne({ email: email });
  if (userExist) throw new AppError(409, "user already exists");

  const newPass = await bcrypt.hash(password, 8);
  if (!newPass) throw new Error("password hashing failed");
  const user = new userModel({
    email: email,
    password: newPass,
  });
  await user.save();
  res.json({ success: true });
});

const handleLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError(400, "invalid request");
  const userExist = await userModel.findOne({ email: email });
  if (!userExist) throw new AppError(400, "invalid email or password");
  const match = bcrypt.compare(password, userExist.password);
  if (!match) throw new AppError(400, "invalid email or password");
  const token = jwt.createToken(userExist._id);
  res.json({
    success: true,
    token,
  });
});


module.exports = {
  handleRegister,
  handleLogin,
};
