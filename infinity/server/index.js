const express = require("express");
const connection = require("./db/db.js");
const authRouter = require("./routes/authRouter.js");
const authentication = require("./routes/jwt.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.get("/", (req, res) => res.send("hello"));

app.listen(8080, async () => {
  await connection;
  console.log("Server started on http://localhost:8080");
});
