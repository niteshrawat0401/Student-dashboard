import React,{useState} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

let init = {
    name: "",
    email: "",
    mobile: "",
  };
export const Editstudent = () => {
  const [student, setStudent] = useState(init);
  const {id} = useParams()
  const navigate = useNavigate()

  const { name, email, mobile } = student;

  const handleEdit = (e) =>{
    e.preventDefault()
    fetch(`http://localhost:8080/editstudent/${id}/student`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, mobile }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Update the post in the parent component's state
          console.log(data);
          navigate("/student")
        })
        .catch((error) => {
          console.error("There was an error updating the post:", error);
        });
  }


const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
    };
  return (
    <>
         <div className="studentFormdiv">
        <h3>Add Student</h3>
        <form onSubmit={handleEdit} className="innerForm">
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
    </>
  )
}
