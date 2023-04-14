import React, { useEffect, useState } from "react";
// import { createStudents } from "../../action/student";
import axios from "axios";
import "./css/students.css";
import empty from "../../assets/empty.jpg";
import spinner from "../../assets/spinner.gif"

let init = {
  name: "",
  email: "",
  mobile: "",
};
export const Student = () => {
  const [student, setStudent] = useState(init);
  const [studentData, setStudentData] = useState([]);
  const [loader, setLoader] = useState(false);

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

  const getStudents = () => {
    setLoader(true)
    axios
      .get("http://localhost:8080/getallstudent/getStudent")
      .then((res) => {
        setStudentData(res.data.getStudents);
        setLoader(false)
        console.log(res.data.getStudents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudents();
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
        {
          loader ? (
            <div style={{ textAlign: "center" }}>
              <img  style={{ textAlign: "center",width: "30%" }} src={spinner}/>
              </div>
          ) : (
            <table>
               <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>

           <tbody>
           {
          //  studentData.length > 0 ? (

          //  )
           studentData.map((ele) => (
                <tr>
                  <td>{ele.name}</td>
                  <td>{ele.email}</td>
                  <td>{ele.mobile}</td>
                </tr>
              ))
            }
           </tbody>
            </table>
          )
        }
        {/* {loader ? (
          // <img src={spinner} alt=""/> :
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((ele) => (
                <tr>
                  <td>{ele.name}</td>
                  <td>{ele.email}</td>
                  <td>{ele.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img
              style={{ width: "70%" }}
              src={empty}
              alt="empty data"
            />
            <h3 style={{ position: "relative", top: "-3.5rem" }}>
              Data not matched
            </h3>
          </div>
        )} */}
      </div>
    </>
  );
};
