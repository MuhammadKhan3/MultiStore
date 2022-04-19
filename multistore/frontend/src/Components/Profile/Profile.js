import React from 'react'
import { useDispatch } from 'react-redux'
import {useState} from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Profile.css'
import { Actions } from '../StoreSlice/store';
import UpdateThunk from '../StoreSlice/UpdateProfileresponse/updateprofileThunk';
import HeaderNavbar from '../headerNavbar/HeaderNavbar';
import { Avatar } from '@mui/material';
import { ProfileLocationThunk } from '../StoreSlice/profilelocationslice/profilelocationThunk';
import Getprofile from '../StoreSlice/updateprofile/Getprofile';
function Profile() {
   const dispatch=useDispatch();
   const name = useSelector(state => state.mainthunk.name)
   const email=useSelector(state=>state.mainthunk.email);
   console.log(email);
   const cityarray=useSelector(state=>state.locationslice.cityarray);
   const location=useSelector(state=>state.mainthunk.city);
   const image=useSelector(state=>state.mainthunk.image);
   const imgflag=useSelector(state=>state.mainthunk.imgflag);
   const [flags,setflags]=useState(false);
   const [img,setimg]=useState('');
   useEffect(() => {
     dispatch(ProfileLocationThunk());
     dispatch(Getprofile());
    //  dispatch(UpdateprofileSlice(sessionStorage.getItem('id')));
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[flags])
   
  const namehandler=(e)=>{
      console.log(e.target.value);
      dispatch(Actions.name(e.target.value));
  }

    const emailhandler=(e)=>{
      dispatch(Actions.email(e.target.value));
    }
    const changelocation=(e)=>{
      dispatch(Actions.location(e.target.value));
    }
    
    const imageupload=(e)=>{
        setimg(e.target.files[0]);
        setflags(true);
    }

    const submithandler=(e)=>{ 
      e.preventDefault();
      console.log(name,email,location);
      const obj={
        name:name,
        email:email,
        location:location,
        image:img,
      }
      if(obj.name.trim().length>0  && obj.email.trim().length>0)
      {
           dispatch(UpdateThunk(obj));
           window.location.reload(false);

          //  setTimeout(() => {
          //   dispatch(NotificationAction.visible())
          //  }, 5000);
      }
    }
  return (
    <>
    <HeaderNavbar/>

    <div className="profile-container border border-success rounded">
    <form>
      <fieldset>
 
      <center>
         <legend className="text-success"><b>Profile Form</b></legend>
      </center>
      <center>
      <input id="image" name="image" type="file" onChange={imageupload} accept="images*" hidden/>
       <label htmlFor="image">
          <Avatar src={imgflag===true ? "http://localhost:8000/"+image : imgflag===false && flags===false ?  '':URL.createObjectURL(img)} 
            style={{
              margin: "10px",
              width: "80px",
              height: "80px",
             }} > 
          </Avatar>
      </label>
      </center>
       <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" dir="auto" className="form-control" id="name" onChange={namehandler} aria-describedby="name" defaultValue={name}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" defaultValue={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={emailhandler}/>
        </div>
        <select value={location} className="form-select" onChange={changelocation} aria-label="Default select example">
          {cityarray.map((city,index)=>   
              <option key={index} value={city.id}>{city.city}</option>
          )}
        </select>
        {/* <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" defaultValue={password} className="form-control" onChange={passwordhandler} id="exampleInputPassword1" autoComplete="on"/>
        </div> */}
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input"  id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-success" onClick={submithandler}>Update</button>
    </fieldset>
    </form>
  </div>
    </>)
}

export default Profile
