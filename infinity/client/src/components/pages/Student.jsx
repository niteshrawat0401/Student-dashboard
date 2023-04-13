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
    </>
  )
}
