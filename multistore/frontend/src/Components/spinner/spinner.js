import React from 'react'
import './spinner.css'
export const Spinner = (props) => {
    return (<div className="spinner spinner-border text-success" style={{
      margin: '84px',
      zIndex:'999',
      position: 'absolute',
      marginLeft: props.marginLeft,
      top: props.top,
    }} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
    )
}

export default Spinner;