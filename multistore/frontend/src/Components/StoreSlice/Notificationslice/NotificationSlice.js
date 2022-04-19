import { createSlice } from '@reduxjs/toolkit'
const initialState={title:'',color:'',visible:false,description:''};
const NotificationSlice=createSlice({
  name:'Notification',
  initialState,
  reducers:{
      notificationToggle:(state,action)=>{
          state.title=action.payload.title;
          state.visible=action.payload.visible;
          state.color=action.payload.color;
          state.description=action.payload.description;
      },
      visible:(state)=>{
          state.visible=false;
      }
  }
});

export const NotificationAction=NotificationSlice.actions;
export default NotificationSlice;