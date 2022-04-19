import axios from 'axios'
import { Cookies } from 'react-cookie'
import { popupaction } from '../../popupslice/popupslice';
import UpdateFetchProductThunk from '../UpdateEditProduct/updfetchProductsthunk';
const cookies=new Cookies();
export const UpdateProductsThunk = (obj) => {
    return async(dispatch)=>{
        const UpdateProduct=async()=>{
            console.log(obj);
            const response=await axios.put("http://localhost:8000/edit-product",obj,{
                headers:{
                    authorization:'Bearer '+cookies.get('token')
                }
            }) 
            dispatch(popupaction.setpopupdata({title:response.data.title,msg:response.data.msg,flag:response.data.flag}))
            dispatch(UpdateFetchProductThunk(cookies.get('productid')));

            await console.log(response);
        }
        UpdateProduct();

    }
}
