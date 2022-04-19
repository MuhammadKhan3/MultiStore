import axios from 'axios'
import React from 'react'
import { Cookies } from 'react-cookie'
import GetCart from '../StoreSlice/carts/getcart';
const cookies=new Cookies();
const quantityThunk = (obj) => {
  return (dispatch)=>{
      const  postquantity=async ()=>{
          const response=await axios.post('http://localhost:8000/post-quantity',obj,{
            headers:{
              Authorization:'Bearer '+cookies.get('token'),
            }
          });
          console.log(response.data);
        dispatch(GetCart());

      }
      postquantity();
  }
}

export default quantityThunk