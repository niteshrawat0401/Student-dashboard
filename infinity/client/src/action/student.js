import axios from "axios"


export const createStudents = ()=>{
    axios.post("http://localhost:8080/createstudent/student")
    .then((res)=>{
        console.log(res);
        return res.json()
    })
    .catch((err)=>{
        console.log("error", err);
    })
}