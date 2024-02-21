import axios from "axios";
import { apiUrl } from "../../ApiKeys";
import {empty, onFailure,onSuccess,startLoading} from "../reducers/UserPoints.reducer";
import Cookies from "js-cookie";
export async function fetchUserPoints(dis,id){
    dis(startLoading());
    try {
        if(!id)throw new Error("id not valid")

        const { data } = await axios.get(`${apiUrl}/mypoints/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("varifiedUser")}` // Attach the Authorization header
            }
        });
            dis(onSuccess(data.points));

    } catch (error) {
        dis(onFailure());
    }
}
export async function emptyPoints(dis){
    dis(startLoading());
    try {
      dis(empty())
    } catch (error) {
        dis(onFailure());
    }
}
