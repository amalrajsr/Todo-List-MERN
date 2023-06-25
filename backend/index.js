const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const session = require("express-session");

require("dotenv").config();
require("./model/dbModel");
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: [`http://localhost:3000`],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoutes);

// golbal error handler
app.use(errorHandler);
app.listen(port, () => console.log(`server running on port ${port}`));
