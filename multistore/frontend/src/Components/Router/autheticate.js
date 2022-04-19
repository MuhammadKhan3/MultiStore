import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const cookies=new Cookies();

const Authenticate=(props)=>{
const Component=props.Component;
   const navigate=useNavigate();
    useEffect(() => {
        if(cookies.get('token')){
            navigate('/Dashboard');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

return(<>
  {!cookies.get('token') &&    <Component/>}
</>);
}
export default Authenticate;