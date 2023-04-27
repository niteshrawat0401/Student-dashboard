import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const StudentDetail = () => {
    const [detail, setDetail] = useState()
    const {id} = useParams()

    const getSIngledata = ()=>{
        axios.get(`http://localhost:8080/getSingledata/${id}/singlestudent`)
        .then((res)=>{
            setDetail(res.data.getsingle)
            // console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getSIngledata()
    },[]);
  return (
    <div>StudentDetail</div>
  )
}
