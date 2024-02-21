import axios from "axios";
import { apiUrl } from "../../ApiKeys";
import {onFailure,onLogout,onSuccess,startLoading} from "../reducers/UserDetails.reducer";
import Cookies from "js-cookie";
export async function fetchUserDetails(dis,id,userData){
    dis(startLoading());
    try {
        if(userData){
            dis(onSuccess(userData));
        }else{
        if(!id)throw new Error("id not valid")
            const {data}=await axios.get(`${apiUrl}/user/details/${id}`,{
                headers:{
                    Authorization:`Bearer ${Cookies.get("varifiedUser")}`
                }
            })
            dis(onSuccess(data));

        }
    } catch (error) {
        dis(onFailure());
    }
}
export async function userLogout(dis){
    dis(startLoading());
    try {
        const {data}=await axios.get(`${apiUrl}/user/logout`);
        dis(onLogout());
    } catch (error) {
        dis(onFailure())
    }
}