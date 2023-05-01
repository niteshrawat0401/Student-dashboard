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
    const [mediaLink, setPdf] = useState(
        // {pdf: ""}
        null
        );
      const [qna, setQna] = useState({
        qna: ""
      })

    const {date, subject} = data;
    // const {pdf} = mediaLink 

    const handleChange = (name) => (event) => {
        setData({ ...data,  [name]: event.target.value });
      };
    
    const handleFile = (e) =>{
        const selectedFile = e.target.files[0];
        setPdf(selectedFile);
    }  

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('pdfFile', mediaLink,mediaLink.name);
        formData.append('date', date);
        formData.append('subject', subject);
    
        axios.post('http://localhost:8080/createNotes/quicknotes', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'blob' // add this line to specify the response type as blob
        })
        .then(response => {
            const reader = new FileReader();
            reader.readAsDataURL(response.data);
            reader.onloadend = () => {
                const base64String = reader.result;
                console.log("base64String", base64String);
                console.log("response", response.data);
            };
        })
        .catch(error => console.error(error));
        // const formData = new FormData();
        // formData.append('pdfFile', mediaLink,mediaLink.name);
        // formData.append('date', date);
        // formData.append('subject', subject);
        // // const payload = {
        // //     // date ,
        // //     // subject,
        // //     mediaLink
        // // }
        // fetch('http://localhost:8080/createNotes/quicknotes', {
        //   method: 'POST',
        //   body: formData,
        // //   headers: {
        // //     'Content-Type': 'multipart/form-data'
        // //   }
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error(error));
    }

    console.log("mediaLink", mediaLink);

  return (
    <>
    <div className='quicknotesdiv'>
        <form className='notesform' onSubmit={handleSubmit}>
        <input className='inpdate' name='date' value={date} type='date'onChange={handleChange("date")}/>
        <br/>
        <input className='inpsub' type='text' name='subject' value={subject} placeholder='Subject' onChange={handleChange("subject")}/>
        <div className='filechoose'>
        <input className='inpsubpdf' type='file' name='mediaLink' accept='application/pdf,application' onChange={handleFile}/>
        <input className='inpsubqna' type='file'/>
        </div>
        <br/>
        <input className='inpsubform' type='submit' value="Submit"/>
        </form>
    </div>
    </>
  )
}
