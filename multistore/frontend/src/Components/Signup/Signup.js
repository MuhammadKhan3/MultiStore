import React from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'
import { useDispatch } from 'react-redux'
import {SignupThunk} from '../StoreSlice/SignupSlice/SignupThunk'
import { Actions } from '../StoreSlice/store'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import errorsfun from '../error/error'
function Signup(props) {
  const dispatch=useDispatch();
  const navigate=useNavigate();
    // const {data:passwordflag,setdata:passwordfunvalidation}=useValidationHook(value=>value.trim()==='');
    // const {data:nameflag,setdata:namefunvalidation}=useValidationHook(value=>value.trim()==='');
    // const {data:emailflag,setdata:emailfunvalidation}=useValidationHook(value=> value.trim()==='' &&  !value.includes("@"));
    const errorflag=useSelector(state=>state.error.flag)
    const errors=useSelector(state=>state.error.errors);
    // const errorarray=


    const name= useSelector(state => state.mainthunk.name)
    const email= useSelector(state => state.mainthunk.email);
    const password= useSelector(state => state.mainthunk.password);
    const confirmpassword=useSelector(state=>state.mainthunk.confirmpassword);
    const emailhandler=(e)=>{
      dispatch(Actions.email(e.target.value));
    }
    const passwordhandler=(e)=>{
     dispatch(Actions.password(e.target.value))
    }
    const namehandler=(e)=>{
      dispatch(Actions.name(e.target.value));
    }
    const Submithandler=async (e)=>{
      e.preventDefault();
      const obj={
        name:name,
        email:email,
        password:password,
        confirmpassword:confirmpassword,
      }
      console.log(obj);
      if(name.trim().length>0 && email.trim().length>0 && password.trim().length>0){
        dispatch(SignupThunk(obj,navigate));
        // d.then((v)=>{
        //   if(v){
        //     history.push("/Dashboard");
        //    }else{
        //    }
        // }); 
      }
    }
    const confirmpasswordhandler=(e)=>{
      dispatch(Actions.confirmpassword(e.target.value))
    }
    // useEffect(()=>{
    //   if(sessionStorage.getItem("name")){
    //     history.push("/Dashboard");
    //   }
    // },[]);

return (
    <form  className="signup-container border border-success" onSubmit={Submithandler}>
      <fieldset>
      <center>
         <legend className="text-success"><b>Signup Form</b></legend>
      </center>
         <div className="">
           <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
           <input type="text" className="form-control" onChange={(e)=>{namehandler(e)}} id="name" aria-describedby="emailHelp" />
           {errorflag && errorsfun('name',errors)} 
        </div>
        <div className="">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={(e)=>{ emailhandler(e)}} id="exampleInputEmail1" aria-describedby="emailHelp" />
          {errorflag && errorsfun('email',errors)} 
        </div>
        <div className="">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={(e)=>{ passwordhandler(e)}} id="exampleInputPassword1"/>
        </div>
        {errorflag && errorsfun('password',errors)}
        <div className="">
          <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" onChange={confirmpasswordhandler} id="exampleInputPassword2"/>
          {errorflag && errorsfun('confirmpassword',errors)}
          {/* {errors.data.map(value => {
          <Errors error={errors.data}/>
            // value==='confirmpassword' && <div className="alert alert-danger" role="alert">Please enter the filed</div>
          })}  */}
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-success">Signup</button>
        <Link to="/Login" className="logbtn"><button type="submit" className="btn btn-success">Login Form</button></Link>
    </fieldset>
    </form>)
}

export default Signup
