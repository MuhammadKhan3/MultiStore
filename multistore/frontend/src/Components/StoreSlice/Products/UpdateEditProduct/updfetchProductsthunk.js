import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies=new Cookies();
const initialState={id:0,flag:false,storeid:0,description:'',supplier:'',companyname:'',address:'',contactno:'',productname:'',productcode:0,barcode:'',saleprice:0,purchaseprice:'',categoryid:0,unitid:0,quantity:0,images:[]};
export const UpdateProductSlice=createSlice({
    name:"updateproductslice",
    initialState,
    reducers:{
        Update:(state,action)=>{
        state.productname=action.payload.product.name;
        state.productcode=action.payload.product.productcode;
        state.barcode=action.payload.product.barcode;
        state.saleprice=action.payload.product.productdetail.saleunitprice;
        state.purchaseprice=action.payload.product.productdetail.buyunitprice;
        state.categoryid=action.payload.product.categoryId;
        state.unitid=action.payload.product.productdetail.unitId;
        state.quantity=action.payload.product.unitsinstock;
        state.description=action.payload.product.description;
        state.storeid=action.payload.product.storeId;
        state.supplier=action.payload.product.Supplier.name;
        state.contactno=action.payload.product.Supplier.contactno;
        state.address=action.payload.product.Supplier.address;
        state.companyname=action.payload.product.Supplier.companyname;
        state.flag=action.payload.flag;
        state.images=action.payload.product.productimages;
        console.log(action.payload.product.productimages)
        console.log(state.images);
        },
        funimages:(state,action)=>{
          state.images=action.payload;
        },
    }
});
export const UpdateProductAction=UpdateProductSlice.actions;

export const UpdateFetchProductThunk=(id)=>{
return async(dispatch)=>{
   const UpdateEditProduct=async ()=>{
     console.log('update product fetch');
     console.log(id);
     const obj={
       id:id
     }
     const response=await axios.post("http://localhost:8000/get-product",obj,{
       headers:{
         authorization:'Bearer '+cookies.get('token'),
       }
     });
     console.log(response.data);
     const productid=await response.data.product.id;
     await cookies.set('productid',productid);
     await dispatch(UpdateProductAction.Update({product:response.data.product,flag:response.data.flag}));
   }
   UpdateEditProduct();
}
}
export default UpdateFetchProductThunk;