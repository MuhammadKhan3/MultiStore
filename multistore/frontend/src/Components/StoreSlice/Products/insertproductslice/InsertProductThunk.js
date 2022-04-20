import axios from "axios";
import { Cookies } from "react-cookie";
import { popupaction } from "../../popupslice/popupslice";
import { spinneraction } from "../../spinnerslice/spinnerslice";
const cookie=new Cookies();
const InsertThunk=(obj,formik)=>{
    return async(dispatch)=>{
        const Insert=async ()=>{
                console.log(cookie.get('token'));
                const response=await axios.post("http://localhost:8000/insert-product",obj,{
                    headers:{
                        Authorization:"Bearer "+cookie.get('token'),
                    }
                });
                if(response.data.errors){
                    dispatch(popupaction.setpopupdata({title:response.data.message,msg:response.data.errors,flag:true}));
                    await dispatch(spinneraction.setspinner(true));
 
                }else{
                    const flag=response.data.flag;
                    dispatch(spinneraction.setspinner(flag));
                    dispatch(popupaction.setpopupdata({title:response.data.title,msg:response.data.msg,flag:response.data.flag}));
                    formik.resetForm();
                }  
        }
        Insert();
    }
}
export default InsertThunk;