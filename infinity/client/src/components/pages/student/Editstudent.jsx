import React,{useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"

let init = {
    name: "",
    email: "",
    mobile: "",
  };
export const Editstudent = () => {
  const [student, setStudent] = useState(init);
  const {id} = useParams()
  console.log(id);

  const { name, email, mobile } = student;
  console.log(student);


 


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
