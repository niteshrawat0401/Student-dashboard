const express = require("express");

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Hello everyone")
})

app.listen(8080, () =>{
    console.log(`server started on http://localhost:8080`);
})