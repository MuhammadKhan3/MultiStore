import axios from 'axios';
import { Cookies } from 'react-cookie'
import { cartaction } from './cartslice';
import GetCart from './getcart';
const cookies=new Cookies();
const addCartThuk = (data) => {
  return async (dispatch)=>{
    console.log('insert')
      const addcart=async()=>{
       const response=await axios.post('http://localhost:8000/insert-cart',data,{
            headers:{
              authorization:"Bearer "+cookies.get('token'),
            }
          });
          if(response.data.cartId){
            cookies.set('cartId',response.data.cartId)
          }
          if(response.data.cartitems){
            dispatch(GetCart());
          }
          dispatch(GetCart()) 

          // window.location.reload(false);
        }
        addcart()
}

}
export default addCartThuk;