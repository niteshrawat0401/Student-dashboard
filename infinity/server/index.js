const express = require("express");
const connection = require("./db/db.js");
const authRouter = require("./routes/authRouter.js");
const studentRouter = require("./routes/studentRouter.js");
const authentication = require("./routes/jwt.js");
require("dotenv").config()

const cors = require("cors");
const quicknotesRouter = require("./routes/quicknotesRouter.js");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
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

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  await connection;
  console.log("Server started on http://localhost:8080");
});

// {
//   "name": "server",
//   "version": "1.0.0",
//   "description": "",
//   "main": "index.js",
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "node index.js"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "dependencies": {
//     "bcrypt": "^5.1.0",
//     "cors": "^2.8.5",
//     "dotenv": "^16.0.3",
//     "express": "^4.18.2",
//     "fs-extra": "^11.1.1",
//     "jsonwebtoken": "^9.0.0",
//     "mongoose": "^7.0.3",
//     "multer": "^1.4.5-lts.1",
//     "nodemon": "^2.0.22"
//   }
// }