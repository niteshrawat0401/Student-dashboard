import React, { useEffect, useState } from "react";
// import { createStudents } from "../../action/student";
import axios from "axios";
import "../css/students.css";
import empty from "../../../assets/empty.jpg";
import spinner from "../../../assets/spinner.gif";
import trash from "../../../assets/trash.png";
import { MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
let init = {
  name: "",
  email: "",
  mobile: "",
};
export const Student = () => {
  const [student, setStudent] = useState(init);
  const [studentData, setStudentData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const { name, email, mobile } = student;
// Submit
  const handleSubmit = (e) => {
    setLoader(true)
    e.preventDefault();
    axios
      .post("http://localhost:8080/createstudent/student", student)
      .then((res) => {
        getUsers();
        // console.log(res.data.createStudent);
      setStudent({ ...init });
      setLoader(false)
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
    setLoader(true)
    if(window.confirm("Are you sure want to delete?") === true){
      axios.delete(`http://localhost:8080/deletestudent/${id}/student`)
      .then((res)=>{
        // console.log(res.data);
          getUsers()
          setLoader(false)
      })
      .catch((err)=>{
        console.log(err);
      })}
    else{setLoader(false)}
  }

// CheckActive
  const handleActive = (id) =>{
    setLoader(true)
    axios.put(`http://localhost:8080/checkactive/${id}/active`)
    .then((res)=>{
      window.location.reload()
      setLoader(false)
      getUsers()
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  // const fetchPosts = async () => {
  //   setLoader(true);
  //   const response = await axios.get(`http://localhost:8080/student/pagination?page=${currentPage}&limit=5`)

  //   const data = await response.json();
  //   console.log(data);
  //   // setUsers(data.users);
  //   // .then((res)=>{
  //   //   console.log(res.data.response.data);
  //   //   setStudentData(res.data.response.data);
  //   //   setPageCount(res.data.response.totalPages);
  //   //   let a = +res.data.response.currentPage
  //   //   console.log(a);
  //   //   setCurrentPage(a);
  //   //   setLoader(false);
  //   // })
  //   // .catch((err)=>{
  //   //   console.log(err);
  //   // })
   
  // };
  // fetchPosts()

  const getUsers = async () => {
    const response = await fetch(`http://localhost:8080/student/pagination?page=${currentPage}&limit=5`);
    const data = await response.json();
    setStudentData(data.response.data);
    setPageCount(data.response.totalPages);
  };
  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const handlePageClick = (event,value) => {
    setCurrentPage(value)
  };

  const handleSearchfilter = (e)=>{
    let value = e.target.value;
    if(value.length != 0){
    axios.get(`http://localhost:8080/search/getSearch/${value}`)
      .then((res)=>{
        setStudentData(res.data.search)
    })
    }
    else{
      getUsers();
    }
  }

  return (
    <>
      <div className="studentFormdiv">
        <h3 className="my-5 bg-purple-700 w-[8rem] text-white h-8 text-center	py-1">Add Student</h3>
        <form onSubmit={handleSubmit} className="innerForm ">
          <div>
            <label>Name</label>
            <br />
            <input
            className="border-2 border-red-50"
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
            className="border-2 border-red-50"

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
            className="border-2 border-red-50"

              type="number"
              name="mobile"
              placeholder="Mobile"
              value={mobile}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <input className="studentsubmit border-2 bg-purple-700 text-gray-50	" type="submit" value="Add Student" />
        </form>
      </div>

      <div className="appendtable">
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" size="small" label="Search" variant="outlined" onChange={handleSearchfilter}/>
    </Box>
        {loader ? (
          <div style={{ textAlign: "center" }}>
            <img style={{ textAlign: "center", width: "30%" }} src={spinner} />
          </div>
        ) : (
          <div>
            <>
            {studentData.length != 0 ? (
              <>
               <TableContainer class="border-purple-700	bg-purple-100" style={{border: "1px solid white"}}  component={Paper}>
      <Table sx={{ minWidth: 800 }} style={{border: "1px solid white"}} aria-label="simple table">
        <TableHead class="bg-purple-700 h-12 ">
          <TableRow style={{border: "1px solid white"}}>
            <TableCell class="text-white" align="center">Name</TableCell>
            <TableCell class="text-white" align="center">Email</TableCell>
            <TableCell class="text-white" align="center">Mobile</TableCell>
            <TableCell class="text-white" align="center">Edit</TableCell>
            <TableCell class="text-white" align="center">Delete</TableCell>
            <TableCell class="text-white" align="center">Active</TableCell>
            <TableCell class="text-white" align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{border: "1px solid #7e22ce"}}>
          {studentData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
              
            >
              <TableCell align="center" component="th" scope="row">
                <Link style={{cursor:"pointer", textDecoration: "none", color: "black"}} to={`/detail/${row._id}`}>{row.name}</Link>
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.mobile}</TableCell>
              <TableCell align="center"><Link to={`/edit/${row._id}`}>Edit</Link></TableCell>
              <TableCell align="center"><img style={{ height: "1.5rem",width: "1.5rem"}} src={trash} alt="trace" onClick={()=>handleDelete(row._id)}/></TableCell>
              <TableCell align="center"> <label onClick={()=>handleActive(row._id)} className="switch">
                        {row.active == true ?
                          <Checkbox {...label} defaultChecked
                          inputProps={{ 'aria-label': 'controlled' }}
                          /> :
                          <Checkbox {...label} disabled/>
                        }
                        <span className="slider round"></span>
                      </label></TableCell>
              <TableCell align="center"> {
                                row.active == true ? (
                                  <p style={{color: "green"}}>Active</p>
                                  ) :
                                  <p style={{color: "red"}}>Inactive</p>
                              }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
              {/* <table>
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
                      
                    <td><Link style={{cursor:"pointer", textDecoration: "none", color: "black"}} to={`/detail/${ele._id}`}>{ele.name}</Link></td>
                      <td>{ele.email}</td>
                      <td>{ele.mobile}</td>
                      <td ><Link to={`/edit/${ele._id}`}>Edit</Link></td>
                      <td><img style={{ height: "1.5rem",width: "1.5rem"}} src={trash} alt="trace" onClick={()=>handleDelete(ele._id)}/></td> */}
                      {/* <td><MdDelete/></td> */}
                      {/* <td  style={{
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
              </table> */}
               <div className="paginationDiv">
              <Stack spacing={2} style={{alignItems:"center"}}>
            <Pagination
             count={pageCount} 
             color="primary"
             currentPage={currentPage}
              onChange={handlePageClick}
            />
            </Stack>
            </div>
              </> 
                     
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
