import { createSlice } from "@reduxjs/toolkit";

const initialState={carts:[],quantity:0,cartflag:false,totalprice:''}
const cartSlice=createSlice({
    name:'carts',
    initialState,
    reducers:{
        setcart:(state,action)=>{
          state.carts=action.payload;
        },
        setquantity:(state,action)=>{
            state.quantity=action.payload;
        },
        settotalprice:(state,action)=>{
           state.totalprice=action.payload;
        },
        setcartflag:(state,action)=>{
            state.cartflag=action.payload;
        }
    }
});

export const cartaction=cartSlice.actions;

export default cartSlice;