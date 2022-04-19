import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { paymentaction } from '../StoreSlice/payment/paymentslice';
import {useFormik} from 'formik'
import * as yup from 'yup';
// import useNav
import './paymentpopup.css'
const validateScheme=yup.object({
  paymentmethod:yup.string().required('payment method required'),
  paymentstatus:yup.string().required('payment status required'),
  message:yup.string(),

});
const PaymentPopup = (props) => {
  const paymentmethoddropdown=["Cash","Jazzcash","Credit Card","other"];
  const paymentstatusdropdown=["verified","pending","draft","other"];
  const   dispatch=useDispatch();
  const paymentmethod=useSelector(state=>state.paymentslice);  
  
  const onSubmit=(e)=>{
    // e.preventDefault();
    props.orderhandler();
    dispatch(paymentaction.setpaymentmethod(''));
    dispatch(paymentaction.setpaymentstatus(''));
    dispatch(paymentaction.setpaymentmessage(''));      
  }
 
  const formik=useFormik({
    initialValues:paymentmethod,
    enableReinitialize:true,
    onSubmit,
    validationSchema:validateScheme,
    validateOnBlur:true,
  });
  
  const paymentmethodhandler=(e)=>{
    console.log(formik.values)
      dispatch(paymentaction.setpaymentmethod(e.target.value));
  }
  const paymentstatushandler=(e)=>{
    console.log(formik.values)

    dispatch(paymentaction.setpaymentstatus(e.target.value));
  }
  const messagehandler=(e)=>{
    console.log(formik.values);
    dispatch(paymentaction.setpaymentmessage(e.target.value));    
  }

  const onclosehandler=(e)=>{
    if(e.target.id==='exampleModal' || e.target.id==='close'){
      dispatch(paymentaction.setpaymentmethod(''));
      dispatch(paymentaction.setpaymentstatus(''));
      dispatch(paymentaction.setpaymentmessage(''));      

    }
  }

  return (<>
<div className="modal fade" id="exampleModal"  onClick={onclosehandler} tabIndex="-1"  aria-labelledby="exampleModalLabel" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Payment</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" id='close' onClick={onclosehandler} aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form  onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <h4 htmlFor="recipient-name" >TotalPrice:{props.totalprice}pkr</h4>
          </div >
          <div className="mb-3">
            <label htmlFor="Category" className="form-label">Payment Method</label>
            <select  className="form-select"  value={formik.values.paymentmethod} onBlur={formik.handleBlur} onChange={paymentmethodhandler} id="paymentmethod" name='paymentmethod'    aria-label="Default select example" >
            <option value=''>select</option>
              {paymentmethoddropdown.map((payment,i)=>
                <option key={i} value={i+1}>{payment}</option>
              ) }
            </select>
            {formik.errors.paymentmethod && formik.touched.paymentmethod ?<h6 className='text-danger'>{formik.errors.paymentmethod}</h6>:''}
          </div>
          <div className="mb-3">
            <label htmlFor="Category" className="form-label">Payment Status</label>
            <select  className="form-select" onBlur={formik.handleBlur} id="paymentstatus" value={formik.values.paymentstatus} onChange={paymentstatushandler} name='paymentstatus'    aria-label="Default select example" >
            <option value="">select</option>
              {paymentstatusdropdown.length>0 && paymentstatusdropdown.map((payment,i)=>{
                return<option key={i} value={i+1}>{payment}</option>
              }) }
            </select>
            {formik.errors.paymentstatus && formik.touched.paymentstatus ? <h6 className='text-danger'>{formik.errors.paymentstatus}</h6> :''}
          </div>
          <div className="message-container mb-3">
            <label htmlFor="message-text" className="col-form-label">Message:</label>
            <textarea className="message-textarea  form-control" onBlur={formik.handleBlur} value={formik.values.message} id="message-text" onChange={messagehandler}></textarea>
          </div>
          <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={onclosehandler} id='close' data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-outline-success"  data-bs-dismiss="modal">Continue</button>
          </div>       
        </form>
      </div>

    </div>
  </div>
  </div>
    </>)
}

export default PaymentPopup;