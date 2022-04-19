import axios from 'axios'
import { Cookies } from 'react-cookie'
import { spinneraction } from '../spinnerslice/spinnerslice';
const cookies=new Cookies();

const featureThunk=(obj)=>{
    return async (dispatch)=>{
        const insertcategory=async ()=>{
            const response= await axios.post("http://localhost:8000/insert-feature",obj,{
                headers:{
                    authorization:'Bearer '+cookies.get('token'),
                }
            });
            console.log(response);
            dispatch(spinneraction.setspinner(response.data.flag))
        }
        insertcategory();
    }
}
export default featureThunk;