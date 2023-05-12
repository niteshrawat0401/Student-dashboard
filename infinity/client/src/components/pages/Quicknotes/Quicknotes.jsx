import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

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

    console.log(month);

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
    </div>
    </>
  )
}