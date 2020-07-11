import axios from "axios";

function getTasks(callback) {
    let data ={};
    axios.get(`/tasks`)
    .then(res=>{
        if ( res.status===200 ) {
            if (res.data !== null ){
                data ={tasks:res.data}; 
                callback(data);               
            }else {
                data ={tasks:res.data}; 
                callback(data);
            }
        } else{
            console.log(`error status code :${res.status} `)
        }
    }).catch(err=>console.log(err));  
  }

export  default getTasks ;