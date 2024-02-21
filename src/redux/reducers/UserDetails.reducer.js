import {createSlice} from "@reduxjs/toolkit";
const userInfo=createSlice({
    initialState:{
        loading:false,
        data:null,
        error:false
    },
    name:"userInfo",
    reducers:{
        startLoading:(state)=>{
            state.loading=true;
        },
        onSuccess:(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        },
        onFailure:(state)=>{
            state.loading=false;
            state.data=null;
            state.error=true;
        },
        onLogout:(state)=>{
            state.loading=false;
            state.data=null;
            state.error=false;
        }
    }
})
export const {onFailure,onLogout,onSuccess,startLoading}=userInfo.actions;
export default userInfo.reducer;