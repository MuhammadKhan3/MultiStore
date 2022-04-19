import React from 'react'
import './Menu.css'
function Menu(props) {
  const toggleSidemenu=()=>{
       props.settoggle(!props.toggle);
  }
    return (
    <>
    <nav className="navbar-main navbar navbar-light bg-light" onClick={toggleSidemenu}>
    <span className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    </span>
    </nav>
  </>)
}

export default Menu
