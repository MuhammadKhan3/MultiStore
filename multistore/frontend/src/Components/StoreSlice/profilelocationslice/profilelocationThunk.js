import axios from 'axios'
import { cityaction } from './profilelocationslice'
export const ProfileLocationThunk = () => {
    return async (dispatch)=>{
      const fetch=async()=>{
          try {
            console.log('hello');
            const response=await axios.get("http://localhost:8000/get-cities");
            console.log(response);
            await dispatch(cityaction.citylocation(response.data.cities));
          } catch (error) {
               console.log(error);  
          }
      }
       fetch();
    }
}
