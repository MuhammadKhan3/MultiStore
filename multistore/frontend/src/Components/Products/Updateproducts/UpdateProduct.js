/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import './UpdateProduct.css'
import { useEffect } from 'react';
import Unit from '../../StoreSlice/Products/insertproductslice/unit/unit';
import { useSelector } from 'react-redux';
import Categorythunk from '../../StoreSlice/categoryslice/categorythunk';
import HeaderNavbar from '../../headerNavbar/HeaderNavbar';
import Storesthunk from '../../StoreSlice/stores/storeslice';
import { useFormik } from 'formik';
import { Cookies } from 'react-cookie';
import * as yup from 'yup';
import UpdateFetchProductThunk, { UpdateProductAction } from '../../StoreSlice/Products/UpdateEditProduct/updfetchProductsthunk';
import { UpdateProductsThunk } from '../../StoreSlice/Products/UpdatedProducts/UpdateProductsThunk';
import Popup from '../../popup/popup';
const cookies=new Cookies();
const validationSchema=yup.object({
  productname:yup.string().min(3,"Product name is not less than 3").required('Product Name is required'),
  productcode:yup.number().min(10,"Product code is not less than 10").required('Product code is required'),  
  quantity:yup.number().min(1).max(100000000).required(),
  categoryid:yup.number().min(1,"Select the category").required('category is required'),
  unitid:yup.number().min(1,"Unit is required").required('unit is required'),
  storeid:yup.number().min(1,"store is required").required('store is required'),
  purchaseprice:yup.number().min(1,"Purchase price greater than 0").required('purchase price required'),
  saleprice:yup.number().min(yup.ref('purchaseprice'), 'sale price will be greater than purchase price '),
  barcode:yup.string().min(4,"Barcode greater than 4").required('barcode required'),
  supplier:yup.string().min(5,"Name will be greater than 5").max(15,"Name is less than 15").required("Supplier name is required"),
  contactno:yup.string().min(11,"Contact will be greater than 11").max(12,"Contact is less than 12").required("Contact is required"),
  address:yup.string().required('address is required'),
  companyname:yup.string().required('companyname is required'),
  description:yup.string().required('description is required'),
  // images:yup.mixed().test('fileType', "Unsupported File Format", value => SUPPORTED_FORMATS.includes(value.type) ),
});

export const UpdateProduct = () => {
  const [flag,setflag]=useState(true);
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(Unit());
    dispatch(Categorythunk());
    dispatch(Storesthunk());
    dispatch(UpdateFetchProductThunk(cookies.get('productid')));
    setflag(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const popupflag=useSelector(state=>state.popupslice.flag);
  // eslint-disable-next-line no-unused-vars
  const [image,setimage]=useState([]);
  const [imglen,setlen]=useState();
  const [delimage,setdelimage]=useState([]);
  const stores=useSelector(state=> state.stores.stores);
  let units= useSelector(state => state.UnitSlice.unit);
  const Category=useSelector(state=>state.Categoryfetch.Category)
  //redux value get
  const loading=useSelector(state=>state.FetchProduct.flag);
  const value=useSelector(state=>state.FetchProduct);

  

  const onSubmit=(e)=>{
    // e.preventDefault();
    console.log(formik.values);
    if(formik.values.productname &&
      formik.values.productcode && 
      formik.values.quantity &&
       formik.values.categoryid && 
       formik.values.unitid &&
       formik.values.storeid &&
       formik.values.saleprice &&
       formik.values.purchaseprice &&
       formik.values.barcode &&
       formik.values.supplier &&
       formik.values.contactno &&
       formik.values.address &&
       formik.values.companyname &&
       formik.values.description
      ){
        const obj=new FormData();
        for(var i=0; i<image.length; i++){
          obj.append("productimage",image[i]);
        }
        delimage.forEach(element => {
          obj.append('deleteimage[]',element);
        });

        obj.append('id',cookies.get('productid'));
        obj.append("productname",formik.values.productname);
        obj.append("productcode",formik.values.productcode);
        obj.append("quantity",formik.values.quantity);
        obj.append("categoryid",formik.values.categoryid);
        obj.append("unitid",formik.values.unitid);
        obj.append("storeid",formik.values.storeid)
        obj.append("saleprice",formik.values.saleprice);
        obj.append("purchaseprice",formik.values.purchaseprice);
        obj.append("barcode",formik.values.barcode)
        obj.append("supplier",formik.values.supplier);
        obj.append('companyname',formik.values.companyname);
        obj.append("contactno",formik.values.contactno);
        obj.append("address",formik.values.address);
        obj.append('description',formik.values.description);
        dispatch(UpdateProductsThunk(obj));
        // window.location.reload(false);
      };
    }

  const [initialdata,setinitialdata]=useState(value);  
  const formik=useFormik({
    enableReinitialize:true,
    initialValues:initialdata, 
    validateOnBlur:true,
    onSubmit,
    validationSchema:validationSchema,
  })
console.log(formik.values.images);

  //console.log(initialdata);
  
  useEffect(()=>{
    setinitialdata(value)
  },[value])
  //product image
const Productimage=async (e)=>{
  for(var i=0; i<e.target.files.length; i++){
    image.push(e.target.files[i]);
  };
  setlen(image.length)
  console.log(image);
}




//submit handler..........

const removeimage=(e)=>{ 
     image.splice(e.target.id,1);
     setlen(image.length);

     //console.log(formik.values.images); 
     //console.log(formik.values.images.length)
}

const removeimageurl=(e)=>{
  console.log(formik.values.images); 
  const id=parseInt(e.target.id);
const value=  formik.values.images.filter(value=>value.id!==id);
dispatch(UpdateProductAction.funimages(value));
delimage.push(parseInt(e.target.id));

console.log(console.log(delimage)); 
}


for (let x in formik.errors) { 
  console.log(formik.errors[x])
}
return (<>
    {popupflag && <Popup/>}
    <HeaderNavbar/>
    {loading &&  <form onSubmit={formik.handleSubmit} className="insert-container border border-success rounded">
      <fieldset>
      <center>
         <legend className="text-success"><b>Update Product</b></legend>
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
          <select  className="form-select" id="Category" name='categoryid' value={formik.values.categoryid} onChange={formik.handleChange}  onBlur={formik.handleBlur} aria-label="Default select example" >
          <option value={0}>select menu</option>
          {flag && Category.map((lists,i)=>
            <option key={i} value={lists.id}>{lists.name}</option>
           )}
          </select>
          {formik.touched.categoryid && formik.errors.categoryid ? <p className="text-danger">{formik.errors.categoryid}</p> : ''}
        </div>
        <div className="general-filed">
          <label htmlFor="unit" className="form-label">Unit</label>
        <select value={formik.values.unitid} onBlur={formik.handleBlur} name='unitid' className="form-select" onChange={formik.handleChange}  id="unit" aria-label="Default select example">
          <option value={0}>select menu</option>
           {flag && units.map((unit,i)=>
            <option key={unit.id} value={unit.id}>{unit.name}</option>
           )}
          </select>
          {formik.touched.unitid && formik.errors.unitid ? <p className="text-danger">{formik.errors.unitid}</p> : ''}
        </div>
        <div className="general-filed">
          <label htmlFor="store" className="form-label">Store</label>
        <select   className="form-select" onBlur={formik.handleBlur} name='storeid'  onChange={formik.handleChange} value={formik.values.storeid}  id="store" aria-label="Default select example">
          <option value={0} >select menu</option>
           {flag && stores.map((unit,i)=>
            <option key={unit.id} value={unit.id}>{unit.name}</option>
           )}
          </select>
          {formik.touched.storeid && formik.errors.storeid ?<p className="text-danger">{formik.errors.storeid}</p> : ''}
        </div>
        <div className="general-filed">
           <label htmlFor="saleprice" className="form-label">Sale Unit Price</label>
           <input type="number" className="form-control" onBlur={formik.handleBlur}  onChange={formik.handleChange} name='saleprice' value={formik.values.saleprice} id="saleprice" aria-describedby="emailHelp"/>
           {formik.touched.saleprice && formik.errors.saleprice ? <p className="text-danger">{formik.errors.saleprice}</p> : ''}
        </div>        
        <div className="general-filed">
           <label htmlFor="purchaseprice" className="form-label">Purchase Unit Price</label>
           <input   type="text"  onChange={formik.handleChange} value={formik.values.purchaseprice}  className="form-control" id="purchaseprice" onBlur={formik.handleBlur} aria-describedby="emailHelp" name='purchaseprice'/>
           {formik.touched.purchaseprice && formik.errors.purchaseprice ? <p className="text-danger">{formik.errors.purchaseprice}</p> : ''}
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
           <input type="text" className="form-control" onChange={formik.handleChange} name='contactno' value={formik.values.contactno} onBlur={formik.handleBlur} id="contactno"  aria-describedby="emailHelp" />
           {formik.touched.contactno && formik.errors.contactno ? <p className="text-danger">{formik.errors.contactno}</p> : ''}

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
        
      <div className='images-container' >
        <label className="label-images">images</label>
         <div className="overflow-check">
           {/* <p className='image-placeholder'>Add the Images</p> */}
          {/* <label  className="rounded border-success image-container" htmlFor="image">
             <input type="file" onChange={(e)=>{
                 const files=e.target.files;
                 let myfiles=Array.from(files);
                 setFieldValue(...myfiles);
             }}     name='images'  onBlur={formik.handleBlur} accept="image/*" id="image" hidden multiple/>  */}
          <label  className="rounded border-success images-container-label" htmlFor="image">
             <input type="file" onChange={Productimage}      name='images'  onBlur={formik.handleBlur} accept="image/*" id="image" hidden multiple/> 
          </label> 
          <div>
          {imglen>0 && image.map((value,i)=>{
           return ( 
            <div className="imageinner" key={value+i}>
              <button id={i} type="button" onClick={removeimage} className="close-btn btn-close" aria-label="Close"></button>                      
              <img className="image-list border-success rounded" src={URL.createObjectURL(value)}  alt="productimages" id={value}/>
            </div>
           )
          })}  
          </div> 
         </div>
      </div>
      {/* image container url base */}
      <div className='image-container'>   
          {formik.values.images.length>0 && formik.values.images.map((value,i)=>{
           return ( 
            <div className="image-container-inner-url" key={i}>
              <button id={value.id} type="button" onClick={removeimageurl} className="close-btn btn-close" aria-label="Close"></button>                      
              <img className="image-list border-success rounded" src={formik.values.images.length>0 ?'http://localhost:8000/'+value.imageurl :'' }  alt="productimages" id={value.id}/>
            </div>
           )
          })}
      </div>
      
      {formik.errors.images ? <p className="image-text text-danger">{formik.errors.images}</p> : ''}

        <div className="btns-container">
          <button type="submit" disabled={!formik.isValid} className="bt btn btn-success">Update</button>
          <button type="button" className="bt btn btn-danger">Cancel</button> 
        {/* <Link to="/Login" className="logbtn"><button type="submit" className="btn btn-primary">Login Form</button></Link> */}
        </div>
    </fieldset>
    </form>}</>
  )
}
