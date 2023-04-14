import React, { useEffect, useState } from "react";
import { createStudents } from "../../action/student";
import axios from "axios";
import "./css/students.css";
import empty from "./empty.jpg";

let init = {
  name: "",
  email: "",
  mobile: "",
};
export const Student = () => {
  const [student, setStudent] = useState(init);
  const [studentData, setStudentData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const { name, email, mobile } = student;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/createstudent/student", student)
      .then((res) => {
        getStudents();
        console.log(res.data.createStudent);
        setStudent({ ...init });
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  useEffect(() => {
   }, []);

  return (
    <>
      <div className="studentFormdiv">
        <h3>Add Student</h3>
        <form onSubmit={handleSubmit} className="innerForm">
          <div>
            <label>Name</label>
            <br />
            <input
              type="text"
              name="name"
              placeholder="Studnet Name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label>Mobile</label>
            <br />
            <input
              type="number"
              name="mobile"
              placeholder="Mobile"
              value={mobile}
              onChange={handleChange}
            />
          </div>
          <br />
          <input className="studentsubmit" type="submit" value="Add Student" />
        </form>
      </div>

      <div className="appendtable">
      
      </div>
    </>
  );
};
