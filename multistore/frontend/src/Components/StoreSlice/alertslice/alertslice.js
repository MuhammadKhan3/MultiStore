import { createSlice } from "@reduxjs/toolkit";


const initialState={title:'',visible:false,alertname:'',message:''}
const alertslice=createSlice({
    name:"alert",
    initialState,
    reducers:{
        alerttoggle:(state,action)=>{
            state.title=action.payload.title;
            state.message=action.payload.message;
            state.visible=action.payload.visible;
            state.alertname=action.payload.alertname;
        },
        alertdisable:(state,action)=>{
            state.visible=false;
        }
    }
});
export const  alertactions=alertslice.actions;
export default alertslice;