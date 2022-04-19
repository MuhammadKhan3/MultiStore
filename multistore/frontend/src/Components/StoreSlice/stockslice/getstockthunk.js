import axios from 'axios'
import React from 'react'
import { cartaction } from '../carts/cartslice'

const getStock = () => {
  return async (dispatch)=>{
      const getstock=async()=>{
          const response=await axios('http://localhost:8000/get-stock');
          console.log(response.data);
          dispatch(cartaction.setcart(response.data.stock))
      }
      getstock();
  }
}

export default getStock