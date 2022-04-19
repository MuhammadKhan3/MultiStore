import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={stores:[]};

const Storesslice=createSlice({
    name:'stores_lists',
    initialState,
    reducers:{
        storefun:(state,action)=>{
            state.stores=action.payload;
        }
    }
});

const  Storesaction=Storesslice.actions;
export {
    Storesslice,
    Storesaction,
}
const Storesthunk=()=>{
    return async(dispatch)=>{
        const fetchstores=async()=>{
            const response=await axios.get('http://localhost:8000/get-stores');
            await console.log(response.data);
            await dispatch(Storesaction.storefun(response.data.stores));
        }
        fetchstores();
    }
}
export default Storesthunk;