import axios from "axios";
import { apiUrl } from "../../ApiKeys";
import {onFailure,onSuccess,startLoading} from "../reducers/AppliedJobs.reducer";
import Cookies from "js-cookie";
export async function fetchAppliedJobs(dis,id){
    dis(startLoading());
    try {
        if(!id)throw new Error("id not valid")
            const {data}=await axios.get(`${apiUrl}/applyforjob/getall/${id}`,{
                headers:{
                    Authorization:`Bearer ${Cookies.get("varifiedUser")}`
                }
            });
            dis(onSuccess(data));

    } catch (error) {
        dis(onFailure());
    }
}
