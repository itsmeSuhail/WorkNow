import {createSlice} from "@reduxjs/toolkit";
const userPoints=createSlice({
    initialState:{
        loading:false,
        data:0,
        error:false
    },
    name:"userPoints",
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
            state.data=0;
            state.error=true;
        },
        empty:(state)=>{
            state.loading=false;
            state.data=0;
            state.error=false;
        }
    }
})
export const {onFailure,onLogout,onSuccess,startLoading,empty}=userPoints.actions;
export default userPoints.reducer;