import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies=new Cookies();

const initialState={products:[],searchflag:true};
export 
const searchslice=createSlice({
    name:'Search Product',
    initialState,
    reducers:{
        setsearch:(state,action)=>{
            console.log(action.payload);
            state.products=action.payload.products;
            state.searchflag=action.payload.flag
        },
        setsearchreset:(state,action)=>{
           state.products=action.payload
        }
    }

});

export const searchproductactions=searchslice.actions;

const SearchProductThunk=(data)=>{
    
    return async(dispatch)=>{
        const searchproduct=async ()=>{
            const response= await axios.post('http://localhost:8000/searchcart-product',data,{
                header:{
                    authorization:"Bearer "+cookies.get('token'),
                }
            });
            dispatch(searchproductactions.setsearch({products:response.data.products,flag:response.data.flag}));
        } 
        searchproduct();
    }
}
export default SearchProductThunk;