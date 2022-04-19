import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { paginationaction } from "../paginationslice/paginationslice";

const initialState={Editlists:[],loading:false}
export const EditSlice=createSlice({
    name:"Editlist",
    initialState,
    reducers:{
     Editlist:(state,action)=>{

         state.Editlists=action.payload.data;
         state.loading=action.payload.flag;
     }
    },
});
export const Editaction=EditSlice.actions;
const EditThunk=()=>{
    console.log("get1")
return async (dispatch)=>{
        console.log("get2")
        const Editlistfetch=async ()=>{
            const response=await axios.post("http://localhost:8000/get-products");
            console.log(response.data);
            await dispatch(paginationaction.setpagination(response.data.pagination))
            await dispatch(Editaction.Editlist({data:response.data.products,flag:response.data.flag}));
        }
        Editlistfetch();
    }
}
export default EditThunk;