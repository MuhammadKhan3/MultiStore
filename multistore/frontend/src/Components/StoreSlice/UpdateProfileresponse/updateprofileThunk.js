import axios from "axios";
import { Cookies } from "react-cookie";

const cookie=new Cookies();

const UpdateThunk=(obj)=>{
    return async(dispatch)=>{
       const UpdateProfile=async ()=>{
           try {
            const formdata=new FormData();
            formdata.append('name',obj.name);
            formdata.append('email',obj.email);
            console.log(obj.location)
            formdata.append('city',obj.location);
            formdata.append('image',obj.image)
            const response=await axios.put("http://localhost:8000/put-profile",formdata,{
                headers:{
                    Authorization:"Bearer "+cookie.get('token'),
                }
            });
            console.log(response);
            console.log(obj.name);
            sessionStorage.removeItem("name");
            sessionStorage.setItem("name",obj.name);
            return response.data
           } catch (error) {
               console.log(error);
           }
       }  
       return UpdateProfile().then(value=>{
           return value;
       });
    };
}
export default UpdateThunk;