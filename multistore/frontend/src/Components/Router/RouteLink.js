import React from 'react'
import Signup from "../Signup/Signup";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../login/Login";
import Profile from "../Profile/Profile";
import InsertProduct from "../Products/InsertProduct/InsertProduct";
import { Protected } from "../Proctected/Protected";
import { Edit } from "../Products/Editproducts/Edit";
import { UpdateProduct } from "../Products/Updateproducts/UpdateProduct";
import Authenticate from './autheticate';
import Maps from "../maps/map";
import Units from "../category/unit";
import Category from "../category/category";
import Stores from "../category/stores";
import { Routes,Route } from "react-router-dom";
import Stock from '../stock/stock';
import StockCard from '../stock/stockcard';
import SimpleChart from '../Dashboard/Graph/SimpleChart';
export const RouteLink = () => { 
   return (
    <>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Dashboard" element={<Protected Component={Dashboard}/>}/>
          <Route path="/InsertProduct" element={<Protected Component={InsertProduct}/>}/>
          <Route path="/EditProduct" element={<Protected Component={Edit}/>}/>
          <Route path="/UpdateProducts" element={<Protected Component={UpdateProduct}/>}/>
          
          {/* <Route path="/Category">
          </Route>
          <Route path="/Stock">
          </Route>
          <Route path="/Purchase">
          </Route> */}
          <Route path="/Signup" element={<Authenticate Component={Signup}/>}/>
          <Route path="/Login" element={<Authenticate Component={Login}/>}/>
          <Route path="/Profile" element={<Protected Component={Profile}/>}/>
          <Route path='/insert-category' element={<Protected Component={Category}/>}/>
          <Route path='/insert-unit' element={<Protected Component={Units}/>}/>
          <Route path='/insert-store' element={<Protected Component={Stores}/>}/>
          <Route path='/add-stock' element={<Protected Component={Stock}/>}/>
          <Route path='/remove-stock' element={<Protected Component={StockCard}/>}/>
          <Route path='/report' element={<Protected Component={SimpleChart}/>}/>

          <Route path='/maps' element={<Maps/>}/>
      </Routes>
    </>
    )
}
