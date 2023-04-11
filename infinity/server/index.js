const express = require("express");
const connection = require("./db/db.js");
const authRouter = require("./routes/authRouter.js");
const customerRouter = require("./routes/customerRouter.js")
const authentication = require("./routes/jwt.js");

const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*"
  })
)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", customerRouter);
app.get("/", (req, res) => res.send("hello"));

app.listen(8080, async () => {
  await connection;
  console.log("Server started on http://localhost:8080");
});
