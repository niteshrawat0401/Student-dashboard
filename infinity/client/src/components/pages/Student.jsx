import React, { useEffect, useState } from "react";
// import { createStudents } from "../../action/student";
import axios from "axios";
import "./css/students.css";
import empty from "../../assets/empty.jpg";
import spinner from "../../assets/spinner.gif";
import trash from "../../assets/trash.png";
import { MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";


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
    setLoader(true);
    axios
      .get("http://localhost:8080/getallstudent/getStudent")
      .then((res) => {
        setStudentData(res.data.getStudents);
        setLoader(false);
        console.log(res.data.getStudents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleDelete = (id) =>{
    axios.delete(`http://localhost:8080/deletestudent/${id}/student`)
    .then((res)=>{
      console.log(res.data);
      getStudents()
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const handleEdit = (id) =>{
    axios.patch(`http://localhost:8080/editstudent/${id}/student`)
    .then((res)=>{
      console.log(res.data);
      // getStudents()
    })
    .catch((err)=>{
      console.log(err);
    })
  }

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
              required
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
              required
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
              required
            />
          </div>
          <br />
          <input className="studentsubmit" type="submit" value="Add Student" />
        </form>
      </div>

      <div className="appendtable">
        {loader ? (
          <div style={{ textAlign: "center" }}>
            <img style={{ textAlign: "center", width: "30%" }} src={spinner} />
          </div>
        ) : (
          <div>
            {studentData.length != 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Active</th>
                  </tr>
                </thead>

                {studentData.map((ele) => (
                  <tbody key={ele._id}>
                    <tr>
                      <td>{ele.name}</td>
                      <td>{ele.email}</td>
                      <td>{ele.mobile}</td>
                      <td ><Link to={`/edit/${ele._id}`}>Edit</Link></td>
                      <td><img style={{ height: "1.5rem",width: "1.5rem"}} src={trash} onClick={()=>handleDelete(ele._id)}/></td>
                      {/* <td><MdDelete/></td> */}
                      <td  style={{
                        padding: "10px 10px 10px 10px",
                        "font-size": "15px",
                        "cursor":"pointer"}}>
                      <label class="switch">
                        {ele.isActive == true ?
                          <input type="checkbox" checked/> :
                          <input type="checkbox"/>
                        }
                        <span className="slider round"></span>
                      </label>
                           </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            ) : (
              <div style={{ textAlign: "center" }}>
                <img style={{ width: "70%" }} src={empty} alt="empty data" />
                <h3 style={{ position: "relative", top: "-3.5rem" }}>
                  Data not matched
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
