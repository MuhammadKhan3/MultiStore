import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { alertactions } from '../StoreSlice/alertslice/alertslice';
import './alert.css'
export const Alert = () => {
    const dispatch=useDispatch();
    const title=useSelector(state=>state.alertslice.title);
    const message=useSelector(state=>state.alertslice.message);
    const alertname=useSelector(state=>state.alertslice.alertname);
    const closehandler=()=>{
      dispatch(alertactions.alertdisable());
    }
return (<>
         <div className={`alert-${alertname} main alert alert-dismissible`} role="alert">
        <strong>{title}</strong>{message} 
        <button onClick={closehandler} type="button" className="btn-close" aria-label="Close"></button>
      </div>
    </>)
}