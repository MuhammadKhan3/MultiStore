import React from 'react'
import { Link } from 'react-router-dom';
import './Login.css'
import { useFormik } from 'formik';
import * as yup  from 'yup'
import { useSelector } from 'react-redux';
import {useDispatch} from "react-redux";
import {LoginThunk} from '../StoreSlice/LoginSlice/LoginThunk'
import  Spinner  from '../spinner/spinner';
import { useNavigate } from 'react-router-dom';
const validationSchema=yup.object({
  email:yup.string().email("Enter the valid email").max(255).required("Email is required"),
  password:yup.string().min(5,"password length minimum 5").max(30,"you enter the maximum password"),
})
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const spinnerflag=useSelector(state=>state.spinner.flag);
  
  const onSubmit=(e)=>{
    dispatch(LoginThunk(formik.values,navigate));
  }
  const formik=useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validateOnBlur:true,
    onSubmit,
    validationSchema:validationSchema,
  });
  

  return (
    <>
  {!spinnerflag &&<Spinner/>}
  <div className="login-container border border-success rounded">
    <form onSubmit={formik.handleSubmit}>
      <fieldset>
      <center>
         <legend className="text-success"><b>Login Form</b></legend>
      </center>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} values={formik.values.email} id="exampleInputEmail1" aria-describedby="emailHelp"/>
          {formik.errors.email && formik.touched.email ? <div className="text-danger" role="alert">{formik.errors.email}</div> :''} 
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} values={formik.values.password} id="exampleInputPassword1"/>
          {formik.errors.password && formik.touched.password ? <div className="text-danger" role="alert">{formik.errors.password}</div> :''} 
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-success" >Login</button>
       <Link to='/Signup' className="signupbtn" ><button type="submit" className="btn btn-success" >Create Account Form</button></Link>
      </fieldset>
    </form>
  </div></>)
}
export default Login;
