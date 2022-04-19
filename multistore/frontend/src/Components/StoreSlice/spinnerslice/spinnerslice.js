import {createSlice } from "@reduxjs/toolkit";
const initialState={flag:true};
const spinnerslice=createSlice({
    name:'spinnerslice',
    initialState,
    reducers:{
        setspinner:(state,action)=>{
            state.flag=action.payload;
        }
    }
})

export const spinneraction=spinnerslice.actions;

export default spinnerslice;