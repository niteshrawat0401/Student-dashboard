import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import empty from "../../../assets/empty.jpg";
import spinner from "../../../assets/spinner.gif";
import trash from "../../../assets/trash.png";

export const StudentDetail = () => {
    const [detail, setDetail] = useState();
    const [loader, setLoader] = useState(false);
    const {id} = useParams()

    const getSIngledata = ()=>{
        setLoader(true);
        axios.get(`http://localhost:8080/getSingledata/${id}/singlestudent`)
        .then((res)=>{
            setDetail(res.data.getsingle)
            // console.log(res.data);
            setLoader(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getSIngledata()
    },[]);
  return (
    <>
         <div className="appendtable">
        {loader ? (
          <div style={{ textAlign: "center" }}>
            <img style={{ textAlign: "center", width: "30%" }} src={spinner} />
          </div>
        ) : (
          <div>
            <>
            {detail ? (
              <>
              <table >
                <thead class="bg-purple-700 h-12">
                  <tr class="text-white">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    {/* <th>Edit</th> */}
                    {/* <th>Delete</th> */}
                    {/* <th>Active</th> */}
                    <th>Status</th>
                  </tr>
                </thead>

                {
                  <tbody className='bg-purple-100' key={detail._id}>
                    <tr>
                      
                    <td> {detail.name}</td>
                      <td>{detail.email}</td>
                      <td>{detail.mobile}</td>
                      {/* <td><img style={{ height: "1.5rem",width: "1.5rem"}} src={trash} alt="trace" /></td> */}
                      {/* <td><MdDelete/></td> */}
                      {/* <td  style={{
                        padding: "10px 10px 10px 10px",
                        fontSize: "15px",
                        cursor:"pointer"}}>
                      <label className="switch">
                        {detail.active == true ?
                          <input type="checkbox" checked/> :
                          <input type="checkbox"/>
                        }
                        <span className="slider round"></span>
                      </label>
                           </td> */}
                           <td>
                              {
                                detail.active == true ? (
                                  <p style={{color: "green"}}>Active</p>
                                  ) :
                                  <p style={{color: "red"}}>Inactive</p>
                              }
                           </td>
                    </tr>
                  </tbody>
                    
                }
              </table>
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
  )
}
