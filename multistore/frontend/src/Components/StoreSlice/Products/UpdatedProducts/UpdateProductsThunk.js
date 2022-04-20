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
            console.log(response);
            dispatch(UpdateFetchProductThunk(cookies.get('productid')));
            if(response.data.errors){
            console.log(response.data);
                dispatch(popupaction.setpopupdata({title:response.data.message,msg:response.data.errors,flag:response.data.errorflag}))
            }else{
                dispatch(popupaction.setpopupdata({title:response.data.title,msg:response.data.msg,flag:response.data.flag}))
            }

            await console.log(response);
        }
        UpdateProduct();

    }
}
