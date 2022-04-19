import React, {  useState } from 'react'
import { useDispatch } from 'react-redux';
import InsertThunk from '../../StoreSlice/Products/insertproductslice/InsertProductThunk';
import './InsertProduct.css'
import { useEffect } from 'react';
import Unit from '../../StoreSlice/Products/insertproductslice/unit/unit';
import { useSelector } from 'react-redux';
import Categorythunk from '../../StoreSlice/categoryslice/categorythunk';

import HeaderNavbar from '../../headerNavbar/HeaderNavbar';
import Storesthunk from '../../StoreSlice/stores/storeslice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { spinneraction } from '../../StoreSlice/spinnerslice/spinnerslice';
import Spinner from '../../spinner/spinner';
import Popup from '../../popup/popup';

const validationSchema=yup.object({
  productname:yup.string().min(3,"Product name is not less than 3").required('Product Name is required'),
  productcode:yup.number().min(10,"Product code is not less than 10").required('Product code is required'),  
  quantity:yup.number().min(1).max(100000000).required(),
  category:yup.number().min(1,"Select the category").required('category is required'),
  unit:yup.number().min(1,"Unit is required").required('unit is required'),
  store:yup.number().min(1,"store is required").required('store is required'),
  purchaseunitprice:yup.number().min(1,"Purchase price greater than 0").required('purchase price required'),
  saleunitprice:yup.number().min(yup.ref('purchaseunitprice'), 'sale price will be greater than purchase price '),
  barcode:yup.string().min(4,"Barcode greater than 4").required('barcode required'),
  supplier:yup.string().min(5,"Name will be greater than 5").max(15,"Name is less than 15").required("Supplier name is required"),
  contact:yup.string().min(11,"Contact will be greater than 11").max(12,"Contact is less than 12").required("Contact is required"),
  address:yup.string().required('address is required'),
  companyname:yup.string().required('companyname is required'),
  description:yup.string().required('description is required'),
  images:yup.array().min(1,"minimum length is file is one").max(5,'maximum file you insert the 5').required('File is required'),
});
const InsertProduct = () => {
  const [flag,setflag]=useState(true);
  const dispatch=useDispatch();
  const [imglen,setlen]=useState();
  const stores=useSelector(state=> state.stores.stores);
  let units= useSelector(state => state.UnitSlice.unit);
  const Category=useSelector(state=>state.Categoryfetch.Category);
  const [blurimage,setblurimage]=useState(false);
  const spinnerflag=useSelector(state=>state.spinner.flag);
  console.log(spinnerflag);
  useEffect(() => {
    dispatch(Unit());
    dispatch(Categorythunk());
    dispatch(Storesthunk());
    setflag(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  

  const onSubmit=(e)=>{
    // e.preventDefault();
    console.log(formik.values);
    if(formik.values.productname &&
       formik.values.productcode && 
       formik.values.quantity &&
       formik.values.category && 
       formik.values.unit &&
       formik.values.store &&
       formik.values.saleunitprice &&
       formik.values.purchaseunitprice &&
       formik.values.barcode &&
       formik.values.supplier &&
       formik.values.contact &&
       formik.values.address &&
       formik.values.companyname &&
       formik.values.description
      ){
        const obj=new FormData();
        for(var i=0; i<formik.values.images.length; i++){
        //console.log(formik.values.images)
          obj.append("images",formik.values.images[i]);
        }
        obj.append("productname",formik.values.productname);
        obj.append("productcode",formik.values.productcode);
        obj.append("quantity",formik.values.quantity);
        obj.append("categoryid",formik.values.category);
        obj.append("unit",formik.values.unit);
        obj.append("stores",formik.values.store)
        obj.append("saleprice",formik.values.saleunitprice);
        obj.append("purchaseprice",formik.values.purchaseunitprice);
        obj.append("barcode",formik.values.barcode)
        obj.append("supplier",formik.values.supplier);
        obj.append("contact",formik.values.contact);
        obj.append("address",formik.values.address);
        obj.append('description',formik.values.description);
        obj.append('company',formik.values.companyname);
        dispatch(spinneraction.setspinner(false))
        dispatch(InsertThunk(obj));
        // window.location.reload();
  
    };
  }
  const formik=useFormik({
    initialValues:{
      productname:'',
      productcode:'',
      quantity:0,
      category:0,
      unit:0,
      store:0,
      saleunitprice:0,
      purchaseunitprice:0,
      barcode:'',
      supplier:'',
      contact:'',
      address:'',
      companyname:'',
      description:'',
      images:[],
    },
    validateOnBlur:true,
    onSubmit,
    validationSchema:validationSchema
  });

//product image
const Productimage=async (e)=>{

  for(var i=0; i<e.target.files.length; i++){
    formik.values.images.push(e.target.files[i]);
  };
  //console.log(formik.values.images);
  setlen(formik.values.images.length)
  setblurimage(true)
}




//submit handler..........
const removeimage=(e)=>{ 
     formik.values.images.splice(e.target.id,1);
     setlen(formik.values.images.length);
     //console.log(formik.values.images); 
     //console.log(formik.values.images.length)
}
console.log(formik.values.images)
console.log(formik.errors)
console.log(blurimage);

return (<>
    {<Popup/>}
    {!spinnerflag && <Spinner top="309px" marginLeft="55%"/>}
    <HeaderNavbar/>
       <form onSubmit={formik.handleSubmit} className="border border-success rounded main-container1 ">
      <fieldset>
      <center>
         <legend className="text-success"><b>Insert Product</b></legend>
      </center>
         <div className="general-filed">
           <label htmlFor="ProductName" className="form-label">Product Name</label>
           <input type="text"  value={formik.values.productname} onChange={formik.handleChange}  onBlur={formik.handleBlur} className="form-control" id="ProductName" aria-describedby="emailHelp" name='productname'   />
           {formik.touched.productname && formik.errors.productname ? <p className="text-danger">{formik.errors.productname}</p> : ''} 
        </div>
        <div className="general-filed">
           <label htmlFor="serialnumber" className="form-label">Product Code</label>
           <input type="number" name='productcode' value={formik.values.productcode} onChange={formik.handleChange} className="form-control" id="serialnumber" aria-describedby="emailHelp" onBlur={formik.handleBlur}/>
           {formik.touched.productcode && formik.errors.productcode ? <p className="text-danger">{formik.errors.productcode}</p> :''} 
        </div>
        <div className="general-filed">
           <label htmlFor="quantity" className="form-label">Quantity</label>
           <input type="text" className="form-control" name='quantity'  value={formik.values.quantity} onChange={formik.handleChange} onBlur={formik.handleBlur} id="quantity" aria-describedby="emailHelp" />
           {formik.touched.quantity && formik.errors.quantity ? <p className="text-danger">{formik.errors.quantity}</p> : ''} 
        </div>                
        <div className="general-filed">
          <label htmlFor="Category" className="form-label">Category</label>
          <select  className="form-select" id="Category" name='category' value={formik.values.category} onChange={formik.handleChange}  onBlur={formik.handleBlur} aria-label="Default select example" >
          <option value={0}>select menu</option>
          {flag && Category.map((lists,i)=>
            <option key={i} value={lists.id}>{lists.name}</option>
           )}
          </select>
          {formik.touched.category && formik.errors.category ? <p className="text-danger">{formik.errors.category}</p> : ''}
        </div>
        <div className="general-filed">
          <label htmlFor="unit" className="form-label">Unit</label>
        <select value={formik.values.unit} onBlur={formik.handleBlur} name='unit' className="form-select" onChange={formik.handleChange}  id="unit" aria-label="Default select example">
          <option value={0}>select menu</option>
           {flag && units.map((unit,i)=>
            <option key={unit.id} value={unit.id}>{unit.name}</option>
           )}
          </select>
          {formik.touched.unit && formik.errors.unit ? <p className="text-danger">{formik.errors.unit}</p> : ''}
        </div>
        <div className="general-filed">
          <label htmlFor="store" className="form-label">Store</label>
        <select   className="form-select" onBlur={formik.handleBlur} name='store'  onChange={formik.handleChange} value={formik.values.store}  id="store" aria-label="Default select example">
          <option value={0} >select menu</option>
           {flag && stores.map((unit,i)=>
            <option key={unit.id} value={unit.id}>{unit.name}</option>
           )}
          </select>
          {formik.touched.store && formik.errors.store ?<p className="text-danger">{formik.errors.store}</p> : ''}
        </div>
        <div className="general-filed">
           <label htmlFor="saleprice" className="form-label">Sale Unit Price</label>
           <input type="number" className="form-control" onBlur={formik.handleBlur}  onChange={formik.handleChange} name='saleunitprice' value={formik.values.saleunitprice} id="saleprice" aria-describedby="emailHelp"/>
           {formik.touched.saleunitprice && formik.errors.saleunitprice ? <p className="text-danger">{formik.errors.saleunitprice}</p> : ''}
        </div>        
        <div className="general-filed">
           <label htmlFor="purchaseprice" className="form-label">Purchase Unit Price</label>
           <input   type="text"  onChange={formik.handleChange} value={formik.values.purchaseprice}  className="form-control" id="purchaseprice" onBlur={formik.handleBlur} aria-describedby="emailHelp" name='purchaseunitprice'/>
           {formik.touched.purchaseunitprice && formik.errors.purchaseunitprice ? <p className="text-danger">{formik.errors.saleunitprice}</p> : ''}
        </div>
        <div className="general-filed">
           <label htmlFor="barcode" className="form-label">BarCode</label>
           <input type="text" className="form-control" onChange={formik.handleChange} value={formik.values.barcode} name='barcode' onBlur={formik.handleBlur} id="barcode"  aria-describedby="emailHelp"/>
           {formik.touched.barcode && formik.errors.barcode ? <p className="text-danger">{formik.errors.barcode}</p> : ''}
        </div>
        <div className="general-filed">
           <label htmlFor="supplier" className="form-label">Supplier Name</label>
           <input type="text" className="form-control" name='supplier' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.supplier} id="supplier"  aria-describedby="emailHelp"/>
           {formik.touched.supplier && formik.errors.supplier ? <p className="text-danger">{formik.errors.supplier}</p> : ''}
        </div>

        <div className="general-filed">
           <label htmlFor="contactno" className="form-label">Contact No</label>
           <input type="text" className="form-control" onChange={formik.handleChange} name='contact' value={formik.values.contact} onBlur={formik.handleBlur} id="contactno"  aria-describedby="emailHelp" />
           {formik.touched.contact && formik.errors.contact ? <p className="text-danger">{formik.errors.contact}</p> : ''}

        </div>
        <div className="general-filed">
           <label htmlFor="address" className="form-label">Address</label>
           <input type="text" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} name='address' value={formik.values.address} id="address"  aria-describedby="emailHelp" />
           {formik.touched.address && formik.errors.address ? <p className="text-danger">{formik.errors.address}</p> : ''}
           {/* {nameflag && <div className="alert alert-danger" role="alert">Please enter the empty filed</div>}  */}
        </div>
        <div className="general-filed">
           <label htmlFor="company" className="form-label">Company Name</label>
           <input type="text" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.companyname} name='companyname' id="company"  aria-describedby="emailHelp" />
           {formik.touched.companyname && formik.errors.companyname ? <p className="text-danger">{formik.errors.companyname}</p> : ''}
           {/* {nameflag && <div className="alert alert-danger" role="alert">Please enter the empty filed</div>}  */}
        </div>

        <div className='description-container'>
          <label htmlFor='description'>Description</label><br/>
          <textarea onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} name='description' className='description-filed' id='description' rows='5' cols='50'>
          </textarea>
           {formik.touched.description && formik.errors.description ? <p className="text-danger">{formik.errors.description}</p> : ''}
        </div>        
      <div className='images-container'>
        <label className="label-images">images</label>
         <div className="overflow-check">
          <label  className="rounded border-success image-container-insert" htmlFor="images">
             <input type="file" onChange={Productimage}  onBlur={formik.handleBlur} name='images' accept="image/*" id="images" hidden multiple/> 
          </label> 
          <div>   
          {imglen>0 && formik.values.images.map((value,i)=>{
           return ( 
            <div className="imageinner" key={value+i}>
              <button id={i} type="button" onClick={removeimage} className="close-btn btn-close" aria-label="Close"></button>                      
              <img className="image-list border-success rounded" src={URL.createObjectURL(value)}  alt="productimages" id={value}/>
            </div>
           )
          })}
          </div> 
         </div>
      {formik.errors.image ?   <p className="image-text text-danger">{formik.errors.images}</p> : ''}
      </div>

        <div className="btns-container-insert">
          <button type="submit" disabled={!formik.isValid} className="bt btn btn-success">Insert Product</button>
          <button type="button" className="bt btn btn-danger">Cancel</button> 
        {/* <Link to="/Login" className="logbtn"><button type="submit" className="btn btn-primary">Login Form</button></Link> */}
        </div>
    </fieldset>
    </form></>
  )
}

export default InsertProduct;