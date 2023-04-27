import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const StudentDetail = () => {
    // const [detail, setSetail] = ({})
    const {id} = useParams()
    console.log(id);

   

    useEffect(()=>{
    },[])
  return (
    <div>StudentDetail</div>
  )
}
