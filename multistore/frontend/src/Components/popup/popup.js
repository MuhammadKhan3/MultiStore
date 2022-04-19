import { useDispatch, useSelector } from "react-redux";
import { popupaction } from "../StoreSlice/popupslice/popupslice";
import './popup.css'
const Popup=()=>{
    const dispatch=useDispatch();
    const flag=useSelector(state=>state.popupslice.flag);
    const msg=useSelector(state=>state.popupslice.msg);
    const title=useSelector(state=>state.popupslice.title);
    const setflag=()=>{
     dispatch(popupaction.setpopupflag(false));     
    }

//  setTimeout(()=>{
//      dispatch(popupaction.setpopupflag(false));
//  },15000)

return(<>{flag && <div className="popup-container modal fade show" style={{
    display:'block'
}} tabIndex="-1" role="dialog">
<div className="modal-dialog" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title">{title}</h5>
      <button type="button" onClick={setflag} className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <p>{msg}</p>
    </div>
    <div className="modal-footer">
      {/* <button type="button" className="btn btn-success">Save changes</button> */}
      <button type="button" onClick={setflag} className="btn btn-danger" data-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>}</>)
}
export default Popup;