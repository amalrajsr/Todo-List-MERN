const jwt = require("jsonwebtoken");
const AppError = require("../utils/error");
const errorHandler = (err, req, res, next) => {
  console.log(err)
  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json({ error: { success: false, message: err.message } });
  } else if (
    err instanceof jwt.TokenExpiredError ||
    err instanceof jwt.JsonWebTokenError
  ) {
    res.status(401).json({
      error: {
        success: false,
        tokenExpired: true,
        message: "token expired or malformed ",
      },
    });
  } else {
    res
      .status(500)
      .json({ error: { success: false, message: "something went wrong" } });
  }
};

module.exports= errorHandler;
