import React, { useState } from 'react'
import "./Quicknotes.css"
import axios from 'axios';

let init = {
    date: "",
    subject: "",
    pdf: "",
    qna: ""
}
export const Addquicknotes = () => {
    const [data, setData] = useState(init);
    const [pdf, setPdf] = useState({
        pdf: ""
      });
      const [qna, setQna] = useState({
        qna: ""
      })

    const {date, subject} = data;
    // const {pdf} = data

    const handleChange = (name) => (event) => {
        // const {name}= event.target.value;
        setData({ ...data, [name]: event.target.value });
      };
    
    const handleFile = (e) =>{
        console.log(e);
        setPdf(e.target.files[0])
    }  

    console.log("pdf", pdf);

    
  return (
    <>
    <div className='quicknotesdiv'>
        <form className='notesform' onSubmit={handleSubmit}>
        <input className='inpdate' name='date' value={date} type='date'onChange={handleChange("date")}/>
        <br/>
        <input className='inpsub' type='text' name='subject' value={subject} placeholder='Subject' onChange={handleChange("subject")}/>
        <div className='filechoose'>
        <input className='inpsubpdf' type='file' accept='application/pdf,application' onChange={handleFile}/>
        <input className='inpsubqna' type='file'/>
        </div>
        <br/>
        <input className='inpsubform' type='submit' value="Submit"/>
        </form>
    </div>
    </>
  )
}
