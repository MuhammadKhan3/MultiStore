import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import HeaderNavbar from '../../headerNavbar/HeaderNavbar'
import EditThunk, { Editaction } from '../../StoreSlice/Editslice/EditThunk';
import UpdateFetchProductThunk from '../../StoreSlice/Products/UpdateEditProduct/updfetchProductsthunk';
import "./Edit.css"
import { Cookies } from 'react-cookie';
import Pagination from '../../pagination/pagination';
import { paginationThunk } from '../../StoreSlice/paginationslice/paginationslice';
import { popupaction } from '../../StoreSlice/popupslice/popupslice';
import Popup from '../../popup/popup';
export const Edit = () => {
    const cookies=new Cookies();
    const dispatch=useDispatch();
    const Editlist=useSelector(state=>state.Editlist.Editlists);
    const loading=useSelector(state=>state.Editlist.loading);
    const DeletData=async(e)=>{
      const response=await axios.post("http://localhost/Pos_PHP/deleteproduct.php",{
        id:e.target.value
      });
      console.log(response);
      dispatch(EditThunk());
    }
    useEffect(()=>{
     const pagination=()=>{
       const params=new URLSearchParams(window.location.search)
       const get=params.get('page');
       dispatch(paginationThunk(get));
     } 
     pagination();
    },[]);
    const getid=(e)=>{
      console.log('productid'+e.target.value);
      dispatch(UpdateFetchProductThunk(e.target.value));
      cookies.set('productid',e.target.value);
      // setTimeout(() => {
      //   window.location.reload(false);
      // },100);    
    }
    const Editthunk=()=>{
        dispatch(EditThunk());
    }
    useEffect(()=>{
      // Editthunk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  
    const search=async (e)=>{
          const obj={key:e.target.value}
          const response =await axios.post("http://localhost:8000/search-products",obj,{
            headers:{
              Authorization:'Bearer '+cookies.get('token'), 
            }
          });
          console.log(response.data)
          if(response.data.products){
            dispatch(Editaction.Editlist({data:response.data.products,flag:response.data.flag}));
          }else{
            console.log(response.data.data[0].msg)
            dispatch(popupaction.setpopupdata({title:response.data.message,msg:response.data.data[0].msg,flag:response.data.errorflag}))
          }
    }
     return (<>
    <HeaderNavbar/>
    <Popup/>
    <table className="table table-striped">
  <thead className="bg-success text-light">
    <tr>
      <th scope="col">sr No.</th>
      <th scope="col">Product Name</th>
      <th scope="col">Location</th>
      <th scope="col">Quantity</th>
      <th scope="col">Product Code</th>
      <th>Created at</th>
      <th className="search search-heading">
      <input type="search" onChange={search} className="text-field form-control" placeholder="Search"/>
      </th>
    </tr>
  </thead>
  <tbody>
    {/* {data && "No data found in this table"} */}
    {loading ? Editlist.map((item,index)=>
    
        <tr key={index}>
           <th scope="row">{item.id}</th>
           <td >{item.name}</td>
           <td >{item.Supplier.address}</td>
           <td >{item.unitsinstock}</td>
           <td >{item.productcode}</td>
           <td>{
           new Date(item.createdAt).toLocaleString()
           }</td>
            <td className="btn-menu" >
            <button type="button"  value={item.id} className="gen-btn first btn btn-danger" onClick={DeletData}>Delete</button>
            <NavLink to="/UpdateProducts"><button type="button" value={item.id} className="gen-btn btn btn-success" onClick={getid} >Edit</button></NavLink>
            <NavLink to="#"><button type="button" className="gen-btn btn btn-info text-light">Barcode</button></NavLink>
            </td>
        </tr> 
    ) :
      <tr>
       <td className='norecord'>No Record exist related</td>
      </tr>
    }
  </tbody>
     </table>
     <Pagination/>
    </>)
}
