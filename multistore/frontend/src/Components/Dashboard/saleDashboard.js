
import { Cookies } from 'react-cookie';
import './saleDashboard.css'
import GetCart from '../StoreSlice/carts/getcart';
import quantityThunk from '../quantity/quantityThunk';
import orderthunk from '../StoreSlice/orderthunk/orderthunk';
import addCartThuk from '../StoreSlice/carts/addcart';
import { Actions } from '../StoreSlice/store';
import PaymentPopup from './paymentpopup';
import { popupaction } from '../StoreSlice/popupslice/popupslice';
import Popup from '../popup/popup';
import SearchProductThunk, { searchproductactions } from '../StoreSlice/searchproduct/searchslice';
import DeleteCart from '../StoreSlice/carts/deletecart';
const { useDispatch, useSelector } =require('react-redux');
const { useEffect, useState }=require('react')


const cookies=new Cookies();

const SaleDashboard = () => {
  const dispatch=useDispatch();
  const [flag,setflag]=useState(false)
  const [inputvalue,setvalue]=useState('');
  const products=useSelector(state=>state.searchproductslice.products);
  const searchflag=useSelector(state=>state.searchproductslice.searchflag);
  const carts=useSelector(state=>state.cartslice.carts);
  const [time,settime]=useState(new Date());
  const name=useSelector(state=>state.mainthunk.name);
  const contactno=useSelector(state=>state.mainthunk.contactno);
  const quantity=useSelector(state=>state.cartslice.quantity);
  const totalprice=useSelector(state=>state.cartslice.totalprice);
  const paymentmethod=useSelector(state=>state.paymentslice.paymentmethod);
  const paymentstatus=useSelector(state=>state.paymentslice.paymentstatus);
  const message=useSelector(state=>state.paymentslice.message);
  const popupflag=useSelector(state=>state.popupslice.flag);

  const searchhandler=(e)=>{
    const product={
      product:e.target.value,
    }
    setvalue(e.target.value)
    if(e.target.value===''){
      dispatch(searchproductactions.setsearchreset([]))
    }else{
      dispatch(SearchProductThunk(product));
    }
  }

  useEffect(() => {

   const intervalid=setInterval(()=>{settime(new Date())},1000)
   console.log('hi')
   return ()=>{ clearInterval(intervalid)}
  }, [time])

  const cartproducthandler= (e)=>{
    // e.preventDefault();
    setvalue('');
    dispatch(searchproductactions.setsearchreset([]))
   const id=e.currentTarget.value;
   const product=products.find(item=>item.id===id)
   const price=product.productdetail.saleunitprice;
   const quantity=product.unitsinstock;
   if(quantity>0){
    const data={
      price:price,
      quantity:1,
      productId:e.currentTarget.value,
      cartId:cookies.get('cartId'),
      EmployeeId:cookies.get('userid')
    }
    dispatch(addCartThuk(data));
    setflag(true)
   }else{
    dispatch(popupaction.setpopupdata({flag:true,msg:'This product not availabe',title:'Quantity'}))
   }
  }

  const orderhandler=()=>{
    console.log('order');
    console.log(contactno);
    console.log(name , paymentmethod ,paymentstatus);
    if(cookies.get('cartId') && name && parseInt(paymentmethod)>0 && parseInt(paymentstatus)>0){
      const obj={
        customername:name,
        cartId:cookies.get('cartId'),
        contactno:contactno || null,
        employeeid:cookies.get('userid'),
        paymentmethod:paymentmethod,
        paymentstatus:paymentstatus,
        message:message,
        totalprice:totalprice,
      }
      dispatch(orderthunk(obj));
      // window.location.reload();
    }
  }

  const counterhandler=(label,caritemtId)=>{
    const obj={
      cartitemId:caritemtId,
      label:label,
    }
    dispatch(quantityThunk(obj));
  }
  useEffect(()=>{
    const reloadcart=()=>{
      if(cookies.get('cartId')){
        console.log('he')
      dispatch(GetCart());
      }
    }
    reloadcart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const deletecart=(cartid,productid,quantity)=>{
    const data={cartid:cartid,productid:productid,quantity:quantity};
    dispatch(DeleteCart(data));
  }
  return (
    <>
    {popupflag && <Popup/>}
    <PaymentPopup totalprice={totalprice} orderhandler={orderhandler}/>
    <div className='main-container'>
     <div className='main-cotainer-innner'>
        <div className="form-row border-bottom border-secondary">
          <div className="col">
            <input type="text" id='searchbar' className="search-bar form-control" placeholder="Search Product" value={inputvalue} onChange={searchhandler}/>
          </div>
        </div>
        <span className="sale-date badge bg-light text-dark">{time.toLocaleDateString('en-US')+' '+time.toLocaleTimeString('en-US')}</span>
        <div className='prodlist-container'>
           <ul>
            {products.length || searchflag===true ? products.map((value,i)=>{
              return <li key={i} onClick={cartproducthandler} className='prod-list bg-light' value={value.id}>&nbsp; <b>    Name: </b>{`${value.name}`}<b>    UPC: </b>{`${value.productcode}`}&nbsp;<b>qty:</b> {`${value.unitsinstock}`} </li>
            }):<p>No Record Found</p>}
          </ul>
        </div>
       <span className='border-span border-bottom border-secondary'></span>
       </div>
      <div className="input-group customer-input">
          <span className="input-group-text">Customer Name or Contact No</span>
          <input type="text" aria-label="customer name" onChange={(e)=>{
            dispatch(Actions.name(e.target.value))
          }}  placeholder='customer name' className="form-control inputs-infomation"/>
          <input type="text" aria-label="Last name"    placeholder='contact no' className="form-control inputs-infomation"
          onChange={(e)=>{
            dispatch(Actions.setcontactno(e.target.value));
          }}
          />
      </div>
      <span className='border-bottom-button border-bottom border-secondary'></span>
       <div className='table-container'>
        <table className="table table-Secondary ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
          {carts.length>0 && carts.map((cart,i)=>{
            return <tr key={cart.id}>
              <th scope="row">{i+1}</th>
              <td>{cart.product.name}</td>
              <td>{cart.price}</td>
              <td>{cart.quantity}</td>
              <td>{cart.totalprice}</td>
              
                <td className="minus bg-success"  onClick={()=>{counterhandler('minus',cart.id)}}>-</td>
                <td className="plus bg-success"   onClick={()=>{counterhandler('plus',cart.id)}}>+</td>
                {/* <img src={trash} onClick={()=>{deletecart(cart.id,cart.productId)}} style={{width:'35px',backgroundColor:"red"}} alt='trash'/> */}
                <button  onClick={()=>{deletecart(cart.id,cart.productId,cart.quantity)}} className='btn btn-outline-danger'>Delete</button>
            </tr>
            })}
       <tr className='border-bottom-table border-bottom border-secondary'></tr>

       {carts.length>=1 &&        <tr>
              <th scope="col">#</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">{quantity}</th>
              <th scope="col">{totalprice}</th>
        </tr>}
          </tbody>
        </table>
       </div>
       {carts.length>=1 &&
       <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" className="orderbtn btn btn-outline-success" onClick={orderhandler}>Order Now</button>
       }
    </div>
    </>)
}

export default SaleDashboard;