import axios from 'axios';
import {Cookies} from 'react-cookie'
import { alertactions } from '../alertslice/alertslice';
import { erroraction } from '../error/errorslice';
const cookies=new Cookies();
export const SignupThunk=(obj,navigate)=>{
    return async(dispatch)=>{
        const  Signup=async ()=>{
            try {

                const  response=await axios.post("http://localhost:8000/signup",obj);
                const errorflag=response.data.errorflag;
                if(errorflag){
                    dispatch(erroraction.errors({errors:response.data,flag:true}));
                }else{
                    dispatch(erroraction.errors({errors:response.data,flag:false}));
                    const tokengen=response.data.token.gentoken;
                    // ,{expires:new Date(new Date().getTime()+60*60*1000)}
                    cookies.set("token",tokengen);
                    cookies.set("user",true);
                    cookies.set("name",response.data.name);
                    dispatch(alertactions.alerttoggle({
                        title:response.data.msg,
                        visible:true,
                        message:"Thank you for registering",
                        alertname:'success'
                    }));
                    navigate('/Dashboard');
                }
                //   sessionStorage.setItem("id",response.data.id);
             return response;
            } catch (error) {
                throw error;
            }
        }
        Signup();
       
    //     return Signup().then((flag)=>{
    //         if(flag){
    //             dispatch(alertactions.alerttoggle({
    //                 title:'Signup successfully',
    //                 visible:true,
    //                 message:"Enjoy the app",
    //                 alertname:'success'
    //               }));
    //               sessionStorage.setItem("name",obj.name);
    //               setTimeout(()=>{    
    //               dispatch(alertactions.alerttoggle({
    //                 title:'',
    //                 visible:false,
    //                 message:"",
    //                 alertname:''
    //               }));},5000);
    //               return true;
    //         }else{
    //             dispatch(alertactions.alerttoggle({
    //                 title:'Signup Issue',
    //                 visible:true,
    //                 message:"Please check the fields",
    //                 alertname:'danger'
    //               }));
    //               return false;
    //         }
    

    //     })
    };
}