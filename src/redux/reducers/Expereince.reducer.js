import {createSlice} from "@reduxjs/toolkit";
const userExperience=createSlice({
    initialState:{
        loading:false,
        data:null,
        error:false
    },
    name:"userExperience",
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
export const {onFailure,onLogout,onSuccess,startLoading}=userExperience.actions;
export default userExperience.reducer;