import React, { useState } from 'react'

export const Quicknotes = () => {
    const [date, setDate] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState();

    console.log(date);

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

    const calYear = ()=>{
        let curentYear= new Date().getFullYear();
        let earlistYear = 2020;
        let temp= [];
        for(curentYear; curentYear>=earlistYear; curentYear--);
        temp.push(curentYear);

        setYear(temp)
    }

  return (
    <div>
        
    </div>
  )
}