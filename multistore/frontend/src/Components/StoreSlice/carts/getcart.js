import axios from 'axios'
import { Cookies } from 'react-cookie'
import { cartaction } from './cartslice';

const cookies=new Cookies();
const GetCart = () => {
  return async (dispatch)=>{
      const getcarts=async()=>{
          const obj={
              cartId:cookies.get('cartId')
          }
          const response=await axios.post('http://localhost:8000/get-cart',obj,{
              headers:{
                  Authorization:"Bearer "+cookies.get('totken')
              }
          });
          setTimeout(()=>{
            dispatch(cartaction.setcart(response.data.cart));
            dispatch(cartaction.setcartflag(response.data.flag));
             dispatch(cartaction.setquantity(response.data.quantity));
            dispatch(cartaction.settotalprice(response.data.totalprice));
          },300)


      }
      getcarts();
  }
}
export default GetCart