import { configureStore, createSlice } from "@reduxjs/toolkit";
import alertslice from "./alertslice/alertslice";
import cartSlice from "./carts/cartslice";
import { Categoryslice } from "./categoryslice/categorythunk";
import Componentslice from "./componetlabel/componentlabel";
import {logger} from 'redux-logger'
import { EditSlice } from "./Editslice/EditThunk";
import errorslice from "./error/errorslice";
import NotificationSlice from "./Notificationslice/NotificationSlice";
import Paginationslice from "./paginationslice/paginationslice";
import Paymentslice from "./payment/paymentslice";
import Popupslice from "./popupslice/popupslice";
import { UnitSlice } from "./Products/insertproductslice/unit/unit";
import { UpdateProductSlice } from "./Products/UpdateEditProduct/updfetchProductsthunk";
import Locationslice from "./profilelocationslice/profilelocationslice";
import { saleSlice } from "./sales/salethunk";
import { searchslice } from "./searchproduct/searchslice";
import spinnerslice from "./spinnerslice/spinnerslice";
import { Storesslice } from "./stores/storeslice";
import { graphslice } from "./graphthunk/graph";
const initialState={contactno:'',name:'',email:'',password:'',image:'',location:'',imgflag:false,confirmpassword:'',auth:null};

const Storeslice=createSlice({
    name: 'MainThunk',
    initialState,
    reducers: {
        name:(state,action)=>{
            state.name=action.payload;
        },
        setcontactno:(state,action)=>{
            state.contactno=action.payload;
        },
        email:(state,action)=>{
            state.email=action.payload;
        },
        password:(state,action)=>{
            state.password=action.payload;
        },
        confirmpassword:(state,action)=>{
            state.confirmpassword=action.payload;
        },
        location:(state,action)=>{
            state.city=action.payload;
        },
        authflag:(state,action)=>{
            state.auth=action.payload;
        },
        image:(state,action)=>{
            state.image=action.payload;
        },
        imgflag:(state,action)=>{
            state.imgflag=action.payload;
            console.log(state.imgflag);
        }
    }});

export const Actions=Storeslice.actions;
const store=configureStore({
    reducer:{
        mainthunk:Storeslice.reducer,alertslice:alertslice.reducer,
        locationslice:Locationslice.reducer,NotificationSlice:NotificationSlice.reducer,
        UnitSlice:UnitSlice.reducer,Categoryfetch:Categoryslice.reducer,
        Editlist:EditSlice.reducer,FetchProduct:UpdateProductSlice.reducer,
        error:errorslice.reducer,spinner:spinnerslice.reducer
        ,stores:Storesslice.reducer,componentlabel:Componentslice.reducer,
        popupslice:Popupslice.reducer,paginationslice:Paginationslice.reducer,
        searchproductslice:searchslice.reducer,cartslice:cartSlice.reducer,
        paymentslice:Paymentslice.reducer,saleslice:saleSlice.reducer,
        graphslice:graphslice.reducer,
    },
    
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
export default store;