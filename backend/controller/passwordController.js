const userModel = require("../model/userModel");
const expressAsyncHandler = require("express-async-handler");
const AppError = require("../utils/error");
const bcrypt = require("bcrypt");
const transporter = require("../utils/nodemailer");

const sendOtp = expressAsyncHandler(async (req, res, next) => {
  if (!req.body.email) throw new AppError(400, "invalid request");
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) throw new AppError(400, "Couldn't verify email");
  let otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  console.log(otp);
  req.session.otp = otp;

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Reset Password",
    html: `<p>Here is your OTP: <b>${otp}</b></p>`,
  };
  // nodemailer for sending otp
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw new Error("failed to send otp");
    res.json({
      success: true,
    });
  });
  res.json({
    success: true,
  });
});

const verifyOtp = expressAsyncHandler(async (req, res, next) => {
  if (!req.body.otp || !req.session.otp)
    throw new AppError(400, "invalid request");
  if (req.body.otp != req.session.otp) throw new AppError(400, "invalid otp");
  res.json({ success: true });
});

const resetPassword = expressAsyncHandler(async (req, res, next) => {
  if (!req.body.user) throw new AppError(400, "invalid request");
  const { user } = req.body;
  if (user.pass !== user.repass) throw new AppError(400, "Password mismatch");
  const newPass = await bcrypt.hash(user.pass, 8);
  if (!newPass) throw new Error("password hash failed");
  console.log(req.id);
  const updateStatus = await userModel.updateOne(
    { email: user.email },
    { $set: { password: newPass } }
  );
  if (!updateStatus.modifiedCount) throw new Error("password updation failed");
  res.json({ success: true });
});
module.exports = {
  sendOtp,
  verifyOtp,
  resetPassword,
};
