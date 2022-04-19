import axios from "axios"
import { createSlice } from "@reduxjs/toolkit";
const initialState={Category:[]};
export const Categoryslice=createSlice({
    name:"CategoryFetch",
    initialState,
    reducers:{
        Categorydata:(state,action)=>{
         state.Category=action.payload;
        }
    }
});
export const Categoryactions=Categoryslice.actions;
const Categorythunk=()=>{
    return async(dispatch)=>{
        const CatFetch=async ()=>{
          const response=await axios.get("http://localhost:8000/get-category");
          const data=await response.data;
          console.log(data);
          await dispatch(Categoryactions.Categorydata(data.category));
        }
        CatFetch();
    }
}
export default Categorythunk;