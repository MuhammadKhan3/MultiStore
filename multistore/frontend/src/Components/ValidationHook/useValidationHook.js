import { useState } from 'react';
// import React from 'react'

const useValidationHook=(validatevalue)=>{
const [data,setdata]=useState('');
const [input,setinput]=useState(false);
let flag=validatevalue(data);  
flag=flag && input; 
 const dataUpdate=(e)=>{
  setinput(true);
  setdata(e.target.value); 
 }
  return{
  data:flag,
  setdata:dataUpdate,
  }
}
export default useValidationHook;