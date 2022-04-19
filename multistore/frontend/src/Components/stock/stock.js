import React, { useState } from 'react'
import HeaderNavbar from '../headerNavbar/HeaderNavbar'
import './stock.css'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../spinner/spinner'
import axios from 'axios'
import stockThunk from '../StoreSlice/stockslice/stockthunk'
import { useNavigate } from 'react-router-dom';

const schemaValidation=yup.object({
    name:yup.string().min(1,'Minimum 5 value is enter').max(25,'maximum you enter the 25 value').required(),
    quantity:yup.number().required()
});

const Stock= () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const spinnerflag=useSelector(state=>state.spinner.flag);
    const [names,setname]=useState([]);
    const [namefo,setnamefo]=useState('');
    const [id,setid]=useState('');
    const onSubmit=(e)=>{
        const data={
            id:id,
            quantity:formik.values.quantity,
        }
        dispatch(stockThunk(data))
        navigate('/remove-stock');
        formik.resetForm();
    }
    const formik=useFormik({
        initialValues:{
           name:namefo,
           quantity:'',
        },
       validateOnBlur:true,
       onSubmit,
       validationSchema:schemaValidation 
    });
    const productclick=(value,id)=>{
        setnamefo(value);
        formik.values.name=value;
        setname([]);
        setid(id);
    }
    const producthandler=async(e)=>{
       setnamefo(e.target.value);
       formik.handleChange(e);
        const response=await axios.post('http://localhost:8000/search-product',{search:e.target.value});
        console.log(response.data.products)
        setname(response.data.products);
    }

    return (
    <>
         {!spinnerflag &&    <Spinner/>}   
        <HeaderNavbar/>

        <form autoComplete="off"   id="form" onSubmit={formik.handleSubmit} className="category-container border border-success rounded">
        <fieldset>
            <legend className="text-success"><b>Insert Stock</b></legend>
            <div className="text-filed">
                <label htmlFor="" className="form-label">Product Name</label>
                <input type="text" name='name' value={formik.values.name} onBlur={formik.handleBlur} onChange={producthandler} className="text-filed-inner form-control" id="name" aria-describedby="emailHelp" />
                {names.length>0 && names.map(value=>{
                   return <p className='list border border-1' key={value.id} style={{margin:'0px',cursor:"pointer"}} onClick={()=>{productclick(value.name,value.id)}} value={value.name}>{value.name}</p>
                })}
                {formik.errors.name && formik.touched.name ? <p className="text-danger" role="alert">{formik.errors.name}</p>:''} 
            </div>
            <div className="text-filed quantity-container">
                <label htmlFor="name" className="form-label">Quantity</label>
                <input type="number" name='quantity' value={formik.values.quantity} onBlur={formik.handleBlur} onChange={formik.handleChange} className="text-filed-inner form-control" id="name" aria-describedby="emailHelp" />
                {formik.errors.quantity && formik.touched.quantity ? <p className="text-danger" role="alert">{formik.errors.quantity}</p>:''} 
            </div>
            <div className='btn-container'>
             <button type="submit" className="btns btn btn-success" disabled={!formik.isValid}>Add</button>
             <button type="submit" className="btns btn btn-danger" >cancel</button>
            </div> 
            {/* <Link to="/Login" className="logbtn"><button type="submit" className="btn btn-primary">Login Form</button></Link> */}
            
        </fieldset>
        </form>
  </>
  )
}

export default Stock;