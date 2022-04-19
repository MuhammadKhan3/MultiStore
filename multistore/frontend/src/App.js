import React from "react";
import MenuPage from "./Components/MenuPage";
import Notification from './Components/Notification/Notification'
import { Alert } from "./Components/Alerts/Alert";
import { useSelector} from 'react-redux'
// import Profile from "./Components/Profile/Profile";
// import { alertactions } from "./Components/StoreSlice/alertslice/alertslice";
// import InsertProduct from "./Components/Products/InsertProduct/InsertProduct"
// import { Edit } from "./Components/Products/Editproducts/Edit";
const App=props=>{
  const alertflag=useSelector(state=>state.alertslice.visible);
  return (
  <>
  {alertflag && <Alert/> }
  <MenuPage/>
  <Notification/>
  </>
  );
}

export default App;
