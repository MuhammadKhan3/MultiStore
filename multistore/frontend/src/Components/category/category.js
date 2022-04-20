import React, { useState } from 'react'
import HeaderNavbar from '../headerNavbar/HeaderNavbar'
import featureThunk from '../StoreSlice/CategoryThunk/featureThunk'
import './category.css'
import { Compactions } from '../StoreSlice/componetlabel/componentlabel'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Spinner from '../spinner/spinner'
import { spinneraction } from '../StoreSlice/spinnerslice/spinnerslice'
import Popup from '../popup/popup'


const schemaValidation=yup.object({
    name:yup.string().min(1,'Minimum 5 value is enter').max(25,'maximum you enter the 25 value').required(),
    urduname:yup.string().min(1,'Minimum 5 value is enter').max(25,'maximum you enter the 25 value').required(),
});

const Category = () => {
    const activestate=useSelector(state=>state.componentlabel.label);
    const dispatch=useDispatch();
    const [select,setselect]=useState(activestate);
    const category=select==='category' ? ' active' :'';
    const store=select==='store' ? ' active' :'';;
    const unit=select==='unit' ? ' active' :'';
    const spinnerflag=useSelector(state=>state.spinner.flag);

    const onSubmit=(e)=>{
        const obj={
            name:formik.values.name,
            urduname:formik.values.urduname,
            state:'category',
        }
        dispatch(spinneraction.setspinner(false))
        console.log(obj);
        dispatch(featureThunk(obj))
        // formik.resetForm();
    }
    const formik=useFormik({
       initialValues:{
           name:'',
           urduname:'',
       },
       validateOnBlur:true,
       onSubmit,
       validationSchema:schemaValidation 
    });

    const funselect=(e)=>{
        setselect(e.target.value)
        console.log(e.target.value);
        dispatch(Compactions.setlabel(e.target.value));
    }

    return (
    <>
    <Popup/>
    {!spinnerflag &&    <Spinner/>}
        <HeaderNavbar/>
        <div className="btns-group btn-group" role="group" aria-label="Basic mixed styles example">
        <NavLink to='/insert-category'><button type="button" onClick={funselect} value='category' className={"btn-inner btn btn-outline-success"+category}>Category</button></NavLink>
        <NavLink to='/insert-store'>    <button type="button" onClick={funselect} value='store' className={"btn-inner btn btn-outline-success"+store}>Store</button></NavLink>
        <NavLink to='/insert-unit'>    <button type="button"  value='unit' onClick={funselect}  className={"btn-inner btn btn-outline-success"+unit}>Unit</button></NavLink>
        </div>
        <form   id="form" onSubmit={formik.handleSubmit} className="category-container border border-success rounded">
        <fieldset>
            <legend className="text-success"><b>Insert Category</b></legend>
            <div className="text-filed">
            <label htmlFor="name" className="form-label">Enter the Category name in English</label>
            <input type="text" name='name' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} className="text-filed-inner form-control" id="name" aria-describedby="emailHelp" />
            {formik.errors.name && formik.touched.name ? <p className="text-danger" role="alert">{formik.errors.name}</p>:''} 
            </div>
            <div className="text-filed">
                <label htmlFor="urduname" className="form-label">Enter the Category name in Urdu</label>
                <input type="text" name='urduname' dir='auto' value={formik.values.urduname} onBlur={formik.handleBlur} onChange={formik.handleChange} className="text-filed-inner form-control" id="urduname" aria-describedby="emailHelp" />
                {formik.errors.urduname && formik.touched.urduname ? <p className="text-danger" role="alert">{formik.errors.urduname}</p>:''} 
                {/* {nameflag && <div className="alert alert-danger" role="alert">Please enter the empty filed</div>}  */}
            </div>
            <div className='btn-container'>
             <button type="submit" className="btns btn btn-success" >Insert</button>
             <button type="submit" className="btns btn btn-danger" >cancel</button>
            </div> 
            {/* <Link to="/Login" className="logbtn"><button type="submit" className="btn btn-primary">Login Form</button></Link> */}
        </fieldset>
        </form>
  </>
  )
}

export default Category