import { createSlice } from "@reduxjs/toolkit";
const initialState={cityarray:[]};
const Locationslice=createSlice({
    name:"locationslice",
    initialState,
    reducers:{
        citylocation:(state,action)=>{
            state.cityarray=action.payload;
        }
    }
})
export const cityaction=Locationslice.actions;
export default Locationslice;