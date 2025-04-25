const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user.routes");
const blogRouter = require("./routes/blog.routes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/blog",blogRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`"server is connect"`);
  } catch {
    console.log("server is disconnetct ");
  }
});
