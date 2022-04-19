import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
const initialState={data:[]}
export const graphslice=createSlice({
    name:'graphslice',
    initialState,
    reducers:{
        setgraph:(state,action)=>{
            state.data=action.payload
        }
    }
})

export const graphaction=graphslice.actions;

const Graph = (data) => {
  return async(dispatch)=>{
      console.log(data)
      const getreport=async ()=>{
          const response=await axios.post('http://localhost:8000/get-report',data);
          console.log(response);
          dispatch(graphaction.setgraph(response.data.sale
));
      }
      getreport();
  }
}

export default Graph