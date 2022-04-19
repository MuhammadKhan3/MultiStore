import { createSlice } from "@reduxjs/toolkit";

const initialState={errors:[],flag:false}
const errorslice=createSlice({
    name:'error slice',
    initialState,
    reducers:{
        errors:(state,action)=>{
            state.errors=action.payload.errors;
            state.flag=action.payload.flag;
            console.log(state.errors);
        }
    }

})

export const erroraction=errorslice.actions;

export default  errorslice;