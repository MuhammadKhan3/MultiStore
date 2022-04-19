import axios from "axios"
import { Cookies } from "react-cookie"
import { alertactions } from "../alertslice/alertslice"
import { spinneraction } from "../spinnerslice/spinnerslice";
const cookies=new Cookies();

export const LoginThunk=(obj,navigate)=>{
  return async (dispatch)=>{
        const Login=async ()=>{
           try {
             const  response=await axios.post("http://localhost:8000/login",obj);
             const data=response.data;
             console.log(data);
             if(data.flag){
              // {expires:new Date(new Date().getTime()+ 1000*60*60)}
               cookies.set("token",data.token,{maxAge: 3600*4});
               setTimeout(() => {
                window.location.reload(false);
               },60*60*1000*4);
               cookies.set("user",data.flag);
               cookies.set('name',data.name);
               cookies.set('userid',data.id)
               dispatch(spinneraction.setspinner(data.flag));
                dispatch(alertactions.alerttoggle({
                  title:response.data.msg,
                  visible:true,
                  message:"Thank you for registering",
                  alertname:'success'
                }))          
                navigate('/Dashboard')
            }else{
                dispatch(alertactions.alerttoggle({
                  title:response.data.msg,
                  visible:true,
                  message:"Not Authenticated",
                  alertname:'danger'
                }))
             }
          }catch(error) {
             console.log(error);      
           }
          }
          Login();
        // return Login().then((v)=>{
        //    if(v){
        //     sessionStorage.setItem('name', obj.name); 
        //     return true
        //    }else{
        //      return false;
        //    }
        //  });


  }
}