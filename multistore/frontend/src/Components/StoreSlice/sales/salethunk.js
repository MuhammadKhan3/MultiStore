import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState={customers:0,saleitems:'',availableitems:'',totalsale:''}
export const saleSlice=createSlice({
    name:'saleslice',
    initialState,
    reducers:{
        setSale:(state,action)=>{
            state.customers=action.payload.customers;
            state.saleitems=action.payload.totalsaleitems;
            state.availableitems=action.payload.availableitems;
            state.totalsale=action.payload.totalsale;
            console.log(state.customers)
        },
    }
})

export const saleaction=saleSlice.actions

const Salethunk =() => {
  return async (dispatch)=>{
      const fetchsalethunk=async ()=>{
          const response=await axios.get('http://localhost:8000/sale-record');
          dispatch(saleaction.setSale(response.data));
      }
      fetchsalethunk();
  }
}

export default Salethunk