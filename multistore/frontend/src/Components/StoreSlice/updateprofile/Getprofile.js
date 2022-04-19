import axios from 'axios';
import { Cookies } from 'react-cookie';
import { Actions } from '../store';
const cookie=new Cookies();

const Getprofile=(name)=>{   
   return (dispatch)=>{
      const fetch=async ()=>{ 
      try {
         const response=await axios.get("http://localhost:8000/get-profile",{
         headers:{
            Authorization:"Bearer "+cookie.get('token'),
         }});
         await console.log(response.data)
            // const data=await response;
            dispatch(Actions.name(response.data.name));
            dispatch(Actions.email(response.data.email));
            dispatch(Actions.location(response.data.city))
            dispatch(Actions.image(response.data.imageurl))
            dispatch(Actions.imgflag(response.data.imageurl !=='' ? true :false))

         } catch (error) {
         console.log(error);
         }    
      }
      fetch();
   }

}
export default Getprofile;