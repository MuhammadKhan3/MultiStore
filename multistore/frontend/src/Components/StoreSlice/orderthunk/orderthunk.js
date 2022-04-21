import axios from 'axios'
import { Cookies } from 'react-cookie'
import GetCart from '../carts/getcart';
const cookies=new Cookies();
const orderthunk = (obj) => {
  return (dispatch)=>{
      const orderproduct=async()=>{
          const response=await axios.post('http://localhost:8000/post-order',obj,{
            headers:{
              authorization:'Bearer '+cookies.get('token'),
            }
          });
          console.log(response);
           if(response.data.flag){
               cookies.remove('cartId');
               window.location.reload();
              // dispatch(GetCart());
            }
      }
      orderproduct();
  }
}

export default orderthunk