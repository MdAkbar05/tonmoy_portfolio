const morgan = require("morgan");
const express = require("express");
const app = express();
const path = require("path");
const xxsClean = require("xss-clean");
const bodyParser = require("body-parser");
const cors = require("cors");
const projectRouter = require("./Routes/projectRouter");
const reviewRouter = require("./Routes/reviewRouter");
const userRouter = require("./Routes/userRouter");
const authRouter = require("./Routes/authRouter");
const createHttpError = require("http-errors");
const cookieParser = require("cookie-parser");

app.use(morgan("dev"));
app.use(xxsClean());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(cookieParser());
// Serve static files from the 'public' directory
app.use(
  "/projectImages",
  express.static(path.join(__dirname, "../../public/projectImages"))
);

// using custom router
app.use("/api/projects", projectRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to portfolio server",
  });
});

//Client Error handling
app.use((req, res, next) => {
  next(createHttpError(404, "Routes not found"));
});

module.exports = app;
