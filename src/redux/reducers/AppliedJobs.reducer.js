import {createSlice} from "@reduxjs/toolkit";
const appliedJobs=createSlice({
    initialState:{
        loading:false,
        data:[],
        error:false
    },
    name:"appliedJobs",
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
            state.data=[];
            state.error=true;
        },
        onLogout:(state)=>{
            state.loading=false;
            state.data=[];
            state.error=false;
        }
    }
})
export const {onFailure,onLogout,onSuccess,startLoading}=appliedJobs.actions;
export default appliedJobs.reducer;