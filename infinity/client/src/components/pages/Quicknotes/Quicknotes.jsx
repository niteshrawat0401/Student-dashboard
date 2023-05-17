import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { QuicknotesDisplay } from './QuicknotesDisplay';

export const Quicknotes = () => {
    const [data, setData] = useState([])
    const curDay = ()=>{
        let date = new Date().getDate().toString();
        return date
    }

    const curMonth = ()=>{
    let month = new Date().toLocaleDateString();
    let curMonth = month.split("-")[0].split("/")
        return curMonth[1]
    }

    const [date, setDate] = useState(curDay())
    const [month, setMonth] = useState(curMonth())
    const [yyyy, setYYYY] = useState(new Date().getFullYear().toString());
    const [year, setYear] = useState([]);

    const months = [
        { label: "January", value: "01" },
        { label: "February", value: "02" },
        { label: "March", value: "03" },
        { label: "April", value: "04" },
        { label: "May", value: "05" },
        { label: "June", value: "06" },
        { label: "July", value: "07" },
        { label: "August", value: "08" },
        { label: "September", value: "09" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
      ];
      
      const days = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31",
    ];

    const calYear = () => {
        let currentYear = new Date().getFullYear();
        let earliestYear = 2020;
    
        let temp = [];
        for (currentYear; currentYear >= earliestYear; currentYear--) {
          temp.push(currentYear);
        }
        setYear(temp);
      };

      useEffect(()=>{
        calYear()
      },[])

      const handleDate = (e) =>{
        setDate(e.target.value)
      }
      const handleMonth = (e) =>{
        setMonth(e.target.value)
      }
      const handleYear = (e) =>{
        setYYYY(e.target.value)
      }

      const getNotes = async () =>{

        let day = yyyy+ "-" + month + "-" + date
        let data = await axios.get(`http://localhost:8080/getquickNotes/quicknotes/${day}`)
        // console.log("data",data.data[0].notes);
        if(data.data.length !== 0){
            setData(data.data[0].notes)
        }
      }

      useEffect(()=>{
        getNotes()
      },[yyyy, month, date]);

      const handleOpenPDF = () => {
        if (data) {
          window.open(data, '_blank');
        }
      };

      // console.log("datas", data);

  return (
    <>
    <div  style={{
                    width: "75%",
                    margin: "auto",
                    marginTop: "4rem",
                    textAlign: "center",
                  }}>
        <select onChange={handleDate} style={{
                      width: "12%",
                      height: "2rem",
                      marginRight:"8px",
                      marginBottom:"5px",
                      background: "#0a405d",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "15px",
                      textAlign: "center",
                      minWidth:"70px",
                    }}>
            <option value="">Date</option>
            {
                days.map((ele, i)=>(
                    <option key={i} value={ele}>{ele}</option>
                ))
            }
        </select>

        <select onChange={handleMonth} style={{
                      width: "12%",
                      height: "2rem",
                      marginRight:"8px",
                      marginBottom:"5px",
                      background: "#0a405d",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "15px",
                      minWidth:"70px",
                      textAlign: "center",
                    }}>
            <option value="">Month</option>
            {
                months.map((ele, i)=>(
                    <option key={i} value={ele.value}>{ele.label}</option>
                ))
            }
        </select>

        <select onChange={handleYear} style={{
                      width: "12%",
                      height: "2rem",
                      marginRight:"8px",
                      marginBottom:"5px",
                      background: "#0a405d",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "15px",
                      minWidth:"70px",
                      textAlign: "center",
                    }}>
            <option value="">Year</option>
            {
                year.map((ele, i)=>(
                    <option key={i} value={ele}>{ele}</option>
                ))
            }
        </select>

        {/* <QuicknotesDisplay data={data}/> */}
        <div 
        // className={clas.notes_container}
        >
                  {data.length == 0 ? (
                    <div>
                      <img
                        style={{ width: "20rem" }}
                        src="https://easyhaionlinewebsite.s3.amazonaws.com/5437683.jpg"
                      />
                      <h1>Notes are not available</h1>
                    </div>
                  ) : (
                    <div>
                      <h2 style={{ fontSize: "22px" }}>QuickNotes</h2>
                      <table
                    //    className={clas.table_notes}
                       >
                        <thead
                        //  className={clas.theader}
                         >
                          <tr>
                            <th style={{ border: "1px solid black" }}>
                              Subject
                            </th>
                            <th style={{ border: "1px solid black" }}>Notes</th>
                            <th style={{ border: "1px solid black" }}>Q&A</th>
                          </tr>
                        </thead>

                        <tbody
                        //  className={clas.body}
                         >
                          { data.map((ele, i) => (
                            <tr key={i}>
                              <td
                                style={{
                                  border: "1px solid black",
                                  fontSize: "15px",
                                  fontWeight: "bold",
                                }}
                              >
                                {ele.subject}
                              </td>
                              <td style={{ border: "1px solid black" }}>
                                <a style={{color:"blue",textDecoration: "none", fontWeight:"500"}}  onClick={handleOpenPDF} target="_blank" href={ele.pdf}>
                                  View
                                </a>
                              </td>
                              <td style={{ border: "1px solid black" }}>
                                <a style={{color:"blue",textDecoration: "none" ,fontWeight:"500"}}  onClick={handleOpenPDF} target="_blank" href={ele.qna}>
                                  View
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
    </div>
    </>
  )
}