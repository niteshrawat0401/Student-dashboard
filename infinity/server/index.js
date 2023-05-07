const express = require("express");
const connection = require("./db/db.js");
const authRouter = require("./routes/authRouter.js");
const studentRouter = require("./routes/studentRouter.js");
const authentication = require("./routes/jwt.js");

const cors = require("cors");
const quicknotesRouter = require("./routes/quicknotesRouter.js");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3001"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/student", studentRouter);
app.use("/createstudent", studentRouter);
app.use("/getallstudent", studentRouter);
app.use("/getsinglestudent", studentRouter);
app.use("/editstudent", studentRouter);
app.use("/deletestudent", studentRouter);
app.use("/checkactive", studentRouter);
app.use("/search", studentRouter);
app.use("/getSingledata", studentRouter);
app.use("/createNotes", quicknotesRouter);
app.use("/getquickNotes", quicknotesRouter);

app.get("/", (req, res) => res.send("hello"));

app.listen(8080, async () => {
  await connection;
  console.log("Server started on http://localhost:8080");
});
