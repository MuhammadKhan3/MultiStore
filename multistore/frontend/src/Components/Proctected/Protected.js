import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Cookies } from 'react-cookie';
const cookies=new Cookies();
export const Protected = (props) => {
    const navigate=useNavigate();
   const Component=props.Component;
   useEffect(()=>{
       if(!cookies.get('token')){
           navigate("/Login")
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);
   return (<>
   {cookies.get('token') && <Component/>}
    </>
    )
}
