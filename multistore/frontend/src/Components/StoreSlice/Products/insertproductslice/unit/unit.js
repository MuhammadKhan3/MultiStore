import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"
const initialState={unit:[]};
export const UnitSlice=createSlice({
    name:"unit",
    initialState,
    reducers:{
        setunit:(state,action)=>{
           state.unit=action.payload;
       }
    }
});
export const setunitaction=UnitSlice.actions;
const Unit=()=>{
    return async(dispatch)=>{
        const fetchunit=async ()=>{
            const response=await axios.get("http://localhost:8000/get-unit");
            await console.log(response);
            dispatch(setunitaction.setunit(response.data.units));
        }
        fetchunit();
    }
}
export default Unit;