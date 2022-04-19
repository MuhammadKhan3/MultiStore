import React, { useState } from "react";
import './imageupload.css'

const Upload= props => {
  const [flag,setflag]=useState();
  const [pictures, setPictures] = useState([]);
  const [pic,setpic]=useState([]);
  const picture=(e)=>{
    setPictures([...pictures,e.target.files]);
    looprun(e.target.files);
    setflag(true);
  }
  const but=()=>{
    console.log(pictures);
  }
  const looprun=(value)=>{
    for (let index = 0; index < value.length; index++) {
      pic.push(URL.createObjectURL(value[index]));
    }
  }
  const imageremove=(e)=>{
   const array= pic.filter(item=>item!==e.target.src)
   console.log(array);
   setpic(array);
  }
  return (<>
    <button onClick={but}>But</button>
    <form>
     <input type="file" onChange={picture} multiple/>
    </form>
    {flag &&  pic.map((item,i)=>
      <div>
        <button type="button" class="btn btn-danger">close</button>
        <img onClick={imageremove}  src={item} className="image" />
      </div>
    )}
     </>
  );
};

export default Upload;