import React from 'react'
import "./css/students.css"

export const Student = () => {
  return (
    <>
    <div className='studentFormdiv'>
    <h3>Add Student</h3>
      <form className='innerForm'>
        <div><label>Name</label>
        <br/>
        <input name='studentName' placeholder='Studnet Name'/>
        </div>
        <br/>
        <div><label>Email</label>
        <br/>
        <input name='mail' placeholder='Email'/>
        </div>
        <br/>
        <div><label>Mobile</label>
        <br/>
        <input name='mobile' placeholder='mobile'/>
        </div>
        <br/>
        {/* <label>Name</label> */}
        {/* <br/> */}
        {/* <input name='studentName' placeholder='Studnet Name'/>
        <br/> */}
        <input className='studentsubmit' type="submit" value="Add Student" />
      </form>
    </div>
      
      <div className='appendtable'>
    <table>
      <thead>
        <tr><th>Name</th>
        <th>Email</th>
        <th>Mobile</th></tr>
      </thead>
      <tbody>
        <tr><td>Nitesh Singh Rawat</td>
        <td>niteshrawat0401@gmail</td>
        <td>1236547894</td>
        </tr>
      </tbody>
    </table>
    </div>
    </>
  )
}
