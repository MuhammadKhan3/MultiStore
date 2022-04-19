import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Editaction } from "../Editslice/EditThunk";
const cookies= new Cookies();


const initialState={pagination:{}}
const Paginationslice=createSlice({
    name:'paginationslice',
    initialState,
    reducers:{
        setpagination:(state,action)=>{
            state.pagination=action.payload;
            console.log(state.pagination);
        }
    }
});

export const paginationaction=Paginationslice.actions;
export const paginationThunk=(pageId)=>{
    return async(dispatch)=>{
        const getproduct=async ()=>{
            const obj={
                pagination:pageId,
            }
            const response=await axios.post('http://localhost:8000/get-products',obj,{
                Authorization:'Bearer '+cookies.get('token'),
            });
            await dispatch(Editaction.Editlist({data:response.data.products,flag:response.data.flag}));
            dispatch(paginationaction.setpagination(response.data.pagination));
        }
        getproduct();
    }
}
export default Paginationslice;