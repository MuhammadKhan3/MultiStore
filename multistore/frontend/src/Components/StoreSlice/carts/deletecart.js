import axios from 'axios';

import { Cookies } from 'react-cookie';
import GetCart from './getcart';
const cookies=new Cookies();
const DeleteCart = (data) => {
  return async(dispatch)=>{
    const deletecart=async()=>{
        console.log(data);
        // console.log(e.currentTarget.value);
        const response=await axios.post('http://localhost:8000/delete-cart',data,{
          headers:{
            Authorization:'Bearer '+cookies.get('token'),
          }
        });

        await dispatch(GetCart());    
        // window.location.reload();
      }
      deletecart();
    
  }
}

export default DeleteCart