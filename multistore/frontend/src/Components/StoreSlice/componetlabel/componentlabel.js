const {createSlice } = require("@reduxjs/toolkit");
const initialState={label:'category'}

const Componentslice=createSlice({
    name:'label',
    initialState,
    reducers:{
        setlabel:(state,action)=>{
            console.log(action.payload)
            state.label=action.payload;
        }
    }
});

export const Compactions=Componentslice.actions;

export default Componentslice;