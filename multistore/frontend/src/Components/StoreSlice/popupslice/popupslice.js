import { createSlice } from "@reduxjs/toolkit";

const initialState={flag:false,msg:'',title:''}
const Popupslice=createSlice({
    name:'popupslice',
    initialState,
    reducers:{
        setpopupdata:(state,action)=>{
            console.log(action.payload);
            state.flag=action.payload.flag;
            state.title=action.payload.title;
            state.msg=action.payload.msg;
        },
        setpopupflag:(state,action)=>{
            state.flag=action.payload;
        }
    }
    ,
})

export const popupaction=Popupslice.actions;

export default Popupslice;