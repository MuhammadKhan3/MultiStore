import React from 'react'
import './Notification.css'
import { useDispatch, useSelector } from 'react-redux'
import { NotificationAction } from '../StoreSlice/Notificationslice/NotificationSlice';
const Notification=()=>{
 const dispatch=useDispatch();
    const title= useSelector(state => state.NotificationSlice.title);
 const  description= useSelector(state => state.NotificationSlice.description);
 const visible=useSelector(state=>state.NotificationSlice.visible);
 const color=useSelector(state=>state.NotificationSlice.color);
 const closehandler=()=>{
     dispatch(NotificationAction.visible());
 }
return (visible &&<div id="data" tabindex="-1" className="modal-container"  role="dialog">
        <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className={`modal-header p-3 mb-2 bg-${color} text-white`}>
            <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-body">
            <p>{description}</p>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-success">Report Error</button>
            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={closehandler}>Close</button>
            </div>
        </div>
        </div>
</div>);
}
export default  Notification;