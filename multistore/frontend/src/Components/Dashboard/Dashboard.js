/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import './Dashboard.css'
import customer from '../icons/Dashboardicon/customers.svg'
import TotalSale from '../icons/Dashboardicon/totalsale.svg'
import item from '../icons/Dashboardicon/item.svg'
import AvailableItem from '../icons/Dashboardicon/availableitem.svg'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Dashboard.css'
import HeaderNavbar from '../headerNavbar/HeaderNavbar'
import SaleDashboard from './saleDashboard'
import Salethunk from '../StoreSlice/sales/salethunk'
function Dashboard() {
   const dispatch=useDispatch();
   const [showflag,setflag]=useState(false);
   const customers=useSelector(state=>state.saleslice.customers)
   const saleitems=useSelector(state=>state.saleslice.saleitems);
   const availableitems=useSelector(state=>state.saleslice.availableitems);
   const totalsale=useSelector(state=>state.saleslice.totalsale);
    
    useEffect(() => {
        dispatch(Salethunk());
    }, [])
    const plushadler=()=>{
        setflag(!showflag)
    }
    return (<>
        <HeaderNavbar/>
        <button type="button" onClick={plushadler} className="plus-icon btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Today Sale
        </button>
        {showflag &&
        <div className="container">
            <div className="total-container border border-primary border shadow p-3 mb-5 bg-white  general availableitem">
                <div className="text text-primary">
                    <h4>{availableitems}</h4>
                    <p>Available item</p>
                </div>
                <img src={AvailableItem} className="imgsize border border-primary bg-primary availableimage" alt="usersvg"></img>
            </div>
            <div className="border border-success border shadow p-3 mb-5 bg-white  customer general">
                <div className="text text-success">
                    <h5>{customers}</h5>
                    <p>customers</p>
                </div>
                <img src={customer} className="imgsize border  bg-success customerimg" alt="usersvg"></img>
            </div>
            <div className="sale-container border border-warning border shadow p-3 mb-5 bg-white  general totalprice">
                <div className="text text-warning">
                    <h4>{Math.round(totalsale)}<span style={{color:'black',fontSize:'16px'}}>Rs</span></h4>
                    <p>Total Sales price</p>
                </div>
                <img src={TotalSale} className="imgsize border border-warning bg-warning totalsaleimg" alt="usersvg"></img>
            </div>
            <div className="item-container border border-danger border shadow p-3 mb-5 bg-white  general itemsale">
                <div className="text text-danger">
                    <h4>{saleitems}</h4>
                    <p>Items sale</p>
                </div>
                <img src={item} className="imgsize border border-danger bg-danger itemsaleimg" alt="user-svg"></img>
            </div>
            {/* <saleDashboard/> */}
            </div>}
            <SaleDashboard/>
        </>)
}
export default Dashboard;
