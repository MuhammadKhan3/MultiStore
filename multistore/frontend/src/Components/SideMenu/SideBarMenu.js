import React, { useState } from 'react';
import './SideBarMenu.css';
import { NavLink } from 'react-router-dom';
import upArrow from '../icons/arrowupsolid.svg'
import downArrow from '../icons/arrowdownsolid.svg'
const SideBarMenu= () => {
const [dropdown,setdropdown]=useState({
    product:false,
    category:false,
    stock:false,
    purchase:false,
    report:false
});
const SubMenuToggle=(e)=>{
    console.log(e.target.title);
    if(e.target.title==="products"){
        setdropdown(()=>{
            return  {product:!dropdown.product,
             category:false}
          });
    }
    else if(e.target.title==="category"){
        setdropdown(()=>{
            return  {product:false,
             category:!dropdown.category}
          });
    }
    else if(e.target.title==="stock"){
        setdropdown(()=>{
            return  {product:false,
             category:false,
             stock:!dropdown.stock,
             purchase:false}
          });
    }
    else if(e.target.title==="purchase"){
        setdropdown(()=>{
            return  {product:false,
             category:false,
             stock:false,
             purchase:!dropdown.purchase}
          });
    }
    else if(e.target.title==="report"){
        setdropdown(()=>{
            return  {product:false,
             category:false,
             stock:false,
             purchase:false,
             report:!dropdown.report}
          });
    }
}
const Dashboardrefresh=()=>{
}
return (<>
<div className="bg-light sidemenucontainer overflow-auto scrollbar-success">
<ul className="sidemenu">
    <li className="sidelink">
        <ul className='lists'>
            <li className="menulist">
            <NavLink to="/Dashboard" onClick={Dashboardrefresh} className="link color">Dashboarad</NavLink>
            </li>
        </ul>
    </li>
      <li className="sidelink">
        <ul className='lists'>  
          <li  onClick={SubMenuToggle} className="menulist"  title="products">
             <NavLink to="#" className="link color" title="products">Products</NavLink>
             <img src={`${dropdown.product ?  downArrow : upArrow}`} alt="dropdownarrow"  className="uparrow" title="products"/>
          </li>
          {dropdown.product &&<> <li className="sideinnerlink link"><NavLink to="/InsertProduct" className="sideinner-anchor">Insert Products</NavLink></li>
          <li className="sideinnerlink link"><NavLink to="/EditProduct" className="sideinner-anchor" >Edit Products</NavLink></li>
          </>}
        </ul>
     </li>
     <li className="sidelink">
      <ul className='lists'>
         <li className="menulist " onClick={SubMenuToggle} title="category">
          <NavLink to="#" className="link color" title="category">Category</NavLink>
          <img src={`${dropdown.category ?  downArrow : upArrow}`} alt="dropdownarrow" title="category" className="uparrow"/>
         </li>
          {dropdown.category &&<> <li className="link sideinnerlink"><NavLink to="/insert-category" className="sideinner-anchor">Insert Category</NavLink></li>
          {/* <li className="link sideinnerlink"><NavLink to="#" className="sideinner-anchor">Delete Category</NavLink></li>
          <li className="link sideinnerlink"><NavLink to="#" className="sideinner-anchor">Edit Category</NavLink></li> */}
          </>}
      </ul>
     </li>
     <li className="sidelink">
      <ul className='lists'>
          <li onClick={SubMenuToggle} className="menulist" title="stock">
          <NavLink to="#" className="link color" title="stock">Stock</NavLink>
          <img src={`${dropdown.stock ?  downArrow : upArrow}`} title="stock" alt="dropdownarrow" className="uparrow"/>
          </li>
          {dropdown.stock &&<> <li className="link sideinnerlink"><NavLink to="/add-stock" className="sideinner-anchor">Add Stock</NavLink></li>
          <li className="link sideinnerlink"><NavLink to="/remove-stock" className="sideinner-anchor">Remove Stock</NavLink></li>
         {/* <li className="link sideinnerlink"><NavLink to="#" className="sideinner-anchor">Edit</NavLink></li> */}
         </>}
      </ul>
     </li>
     <li className="sidelink">
        <ul className='lists'>
          <li onClick={SubMenuToggle} title="report" className="menulist">
          <NavLink to="#" className="link color"  title="report" >Report</NavLink>
            <img src={`${dropdown.report ?  downArrow : upArrow}`} title="report" alt="dropdownarrow"  className="uparrow"/>
          </li>
          {dropdown.report &&<><li className="sideinnerlink link"><NavLink to="/report" className="sideinner-anchor">Sale</NavLink></li> 
          </>}
        </ul>
     </li>
</ul>
</div>
</>)
}
export  default SideBarMenu;