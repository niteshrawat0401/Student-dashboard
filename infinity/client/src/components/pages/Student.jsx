import React, { useEffect, useState } from "react";
// import { createStudents } from "../../action/student";
import axios from "axios";
import "./css/students.css";
import empty from "../../assets/empty.jpg";
import spinner from "../../assets/spinner.gif";
import trash from "../../assets/trash.png";
import { MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';


let init = {
  name: "",
  email: "",
  mobile: "",
};
export const Student = () => {
  const [student, setStudent] = useState(init);
  const [studentData, setStudentData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const { name, email, mobile } = student;
// Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/createstudent/student", student)
      .then((res) => {
        getStudents();
        // console.log(res.data.createStudent);
        setStudent({ ...init });
      })
      .catch((err) => {
        console.log(err);
      });
  };
// Get students 
  const getStudents = () => {
    setLoader(true);
    axios
      .get("http://localhost:8080/getallstudent/getStudent")
      .then((res) => {
        setStudentData(res.data.getStudents);
        setLoader(false);
        // console.log(res.data.getStudents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);
// Delete
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

// CheckActive
  const handleActive = (id) =>{
    axios.put(`http://localhost:8080/checkactive/${id}/active`)
    .then((res)=>{
      // console.log(res.data);
      getStudents()
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const fetchPosts = async (page) => {
    await axios.get(`http://localhost:8080/student/pagination?page=${page}`)
    .then((res)=>{
      console.log(res.data.pageFind);
      setStudentData(res.data.pageFind);
      setPageCount(res.data.totalData);
      setCurrentPage(res.data.totalData - 1);
    })
    .catch((err)=>{
      console.log(err);
    })
   
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handlePageClick = (data) => {
    fetchPosts(data.selected + 1);
  };

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
            <>
            {studentData.length != 0 ? (
              <>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Active</th>
                    <th>Status</th>
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
                        fontSize: "15px",
                        cursor:"pointer"}}>
                      <label onClick={()=>handleActive(ele._id)} className="switch">
                        {ele.active == true ?
                          <input type="checkbox" checked/> :
                          <input type="checkbox"/>
                        }
                        <span className="slider round"></span>
                      </label>
                           </td>
                           <td>
                              {
                                ele.active == true ? (
                                  <p style={{color: "green"}}>Active</p>
                                  ) :
                                  <p style={{color: "red"}}>Inactive</p>
                              }
                           </td>
                    </tr>
                  </tbody>
                    
                ))}
              </table>
               
              <ReactPaginate
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={1}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              /></>
               
                     
            ) : (
              <div style={{ textAlign: "center" }}>
                <img style={{ width: "70%" }} src={empty} alt="empty data" />
                <h3 style={{ position: "relative", top: "-3.5rem" }}>
                  Data not matched
                </h3>
              </div>
            )}
            </>
          </div>
        )}
      </div>
    </>
  );
};
