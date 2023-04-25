import axios from "axios"


export const getPagi = (currentPage) =>{
    axios.get(`http://localhost:8080/student/pagination?page=${currentPage}&limit=5`)
    .then((res)=>{
        console.log( res.data);
        return res.data
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const getSearchkey = (value) =>{
    axios.get(`http://localhost:8080/search/getSearch/${value}`)
    .then((res)=>{
        // console.log( res.data.search);
        return res.data.search
    })
    .catch((err)=>{
        console.log(err);
    })
}