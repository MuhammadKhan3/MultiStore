import React from "react";
const Errors=(props)=>{
   const error=props.error;
   return(
   error.map((x)=>{
       return error[x].param==='confirmpassword' && <div className="alert alert-danger" role="alert">Please enter the filed</div> 
    }))
}
export default Errors