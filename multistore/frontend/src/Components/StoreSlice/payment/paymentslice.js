import { createSlice } from "@reduxjs/toolkit";

const initialState={paymentmethod:'',paymentstatus:'',message:''};
const Paymentslice=createSlice({
    name:'paymentslice',
    initialState,
    reducers:{
        setpaymentmethod:(state,action)=>{
            state.paymentmethod=action.payload;
        },
        setpaymentstatus:(state,action)=>{
           state.paymentstatus=action.payload;
        },
        setpaymentmessage:(state,action)=>{
             state.message=action.payload;
        }
    }
});
export const paymentaction=Paymentslice.actions;

export default Paymentslice;