import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderNavbar from '../headerNavbar/HeaderNavbar'
import getStock from '../StoreSlice/stockslice/getstockthunk'
import './stockCard.css'
const StockCard = () => {
  const dispatch=useDispatch();
  const stocks=useSelector(state=>state.cartslice.carts)
  useEffect(() => {
      dispatch(getStock())
    }, [])

  const deletestock=(id,productid)=>{
   axios.post('http://localhost:8000/delete-stock',{id:id,pid:productid})
   .then(response=>{
       console.log(response);
      dispatch(getStock())

   })
  }
  return (  <>
  <HeaderNavbar/>
  <section className='card-container'>
  {stocks.length>0 &&
   stocks.map((value,i)=>{
    return  <div key={i} value={value.id} className="card border-success mb-3 cards" style={{maxWidth:"18rem"}}>
    <div className="card-header  fs-4 text-uppercase bg-transparent border-success">{value.product.name}</div>
    <div className="card-body text-success">
        <h5 className="card-title">{"Quantity: "+value.quantity}</h5>
        {/* <h5 className="card-title">{"Quantity: "+value.price}</h5> */}
        <h5 className="date card-title">{"createdAt: "+new Date(value.createdAt).toLocaleString()}</h5>
    </div>
    <button type="button" value={value.id} className="text-delete btn btn-danger" onClick={()=>{
        deletestock(value.id,value.product.id)
    }}>Delete</button>
    {/* <div className="card-footer bg-transparent border-success">Footer</div> */}
    </div>
   })
       
        }
  </section>
</>)
}

export default StockCard