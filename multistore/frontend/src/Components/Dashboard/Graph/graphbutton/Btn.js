import React from 'react'
import { Cookies } from 'react-cookie';
import './Btn.css'
const cookies=new Cookies();

function Btn(props) {

return (<div className="btn-group containerbtn" role="group" aria-label="Basic mixed styles example">
    <button type="button" className={`btn ${cookies.get('switch')==='day' ?'btn-outline-primary' :'btn-primary'}`}  onClick={props.Day}>Day</button>
  <button type="button" className={`btn ${cookies.get('switch')==='month' ?'btn-outline-primary' :'btn-primary'}`} onClick={props.Month}>Month</button>
  <button type="button" className={`btn ${cookies.get('switch')==='year' ?'btn-outline-primary' :'btn-primary'}`} onClick={props.Yearly}>Year</button>
  </div>)
}

export default Btn;