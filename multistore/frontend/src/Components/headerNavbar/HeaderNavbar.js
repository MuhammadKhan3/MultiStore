import React from 'react'
import './HeaderNavbar.css'
import { Link } from 'react-router-dom';
import ProfilePic from '../profilepicture/userprofile.jpg'
import Menu from '../Main/Menu';
import SideBarMenu from '../SideMenu/SideBarMenu';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useEffect } from 'react';
const cookies=new Cookies();

const HeaderNavbar=()=>{ 

   const [toggle,settoggle]=useState(true);
    const Logout=()=>{
       cookies.remove("user");
       cookies.remove("token");
       cookies.remove("name");
       window.location.reload(false);
    }
    useEffect(() => {
       return () => {
       };
    },[])
    return (<div className="main-nav">
    <Menu toggle={toggle} settoggle={settoggle}/>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <div className="container-fluid">
          <div className='brand'>
             <h4 className="navbar-brand text-success" href="#">Multi Store</h4>
          </div>
          <div>
             <div className="profilepic">
                <img src={ProfilePic} className="rounded-circle" alt="Cinque Terre" width="50" height="50"/>
             </div>
             <div className="profilenav">
                <h5 className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle text-success" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{cookies.get('name') && cookies.get('name').toUpperCase()}</Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link to="/Profile" className="dropdown-item" >Profile</Link></li>
                        <li><Link to="#" className="dropdown-item" >Mode</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        {sessionStorage.length<0  &&  <li><Link to="/Signup" className="dropdown-item" >Signup</Link></li>}
                        <li><Link to="#" className="dropdown-item" onClick={Logout}>Logout</Link></li>
                    </ul>
                </h5>    
              </div>        
            </div>
       </div>
   </nav>
   {toggle && <SideBarMenu/>}
    </div>);
}
export default HeaderNavbar;