import React, { useEffect, useState } from 'react'
import InputBox, { FileBox, SelectBox } from './InputBox';
import "./Details.scss"
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { apiUrl } from '../../ApiKeys';
import Cookies from 'js-cookie';
import { fetchUserPoints } from '../../redux/apiCalls/userPoints.api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../redux/apiCalls/userDetails.api';
import { fetchUserExperience } from '../../redux/apiCalls/userExperience';
const Experience = () => {
    const dis=useDispatch();
  const data=useSelector(state=>state.experience)
  const {id}=useParams();
  const nav=useNavigate();
  useEffect(()=>{
    if(!id||id==="undefined")nav("/");
  },[id])
    const [userDetails, setuserDetails] = useState({
        expType:"",companyName:"",companyLink:"",companyRole:"",expStartTime:"",expEndTime:""
    })
    
    useEffect(()=>{
        if(!data.data&&id){
            fetchUserExperience(dis,id);
        }
      },[id,data])
      useEffect(()=>{
       if(id){
        if(data?.data)setuserDetails(data?.data);
       }
      },[data.loading])
    const handleDetails=(e)=>{
        const {name,value}=e.target;
        setuserDetails(prev=>{
        return{...prev,[name]:value};

        });
    }
   const uploadDetails=async()=>{
     try {
        const {data}=await axios.put(`${apiUrl}/user/experience/${id}`,{...userDetails},{
            headers: {
                Authorization: `Bearer ${Cookies.get("varifiedUser")}` // Attach the Authorization header
            }
        });
        if(data){
            fetchUserPoints(dis,id);
            toast.success("Data updated");
        }
     } catch (error) {
        toast.error("something went wrong");
     }
   }
  return <>
  <div className="details_container">
    <h1>
      Add  Experience Details
    </h1>
    <div className="details_wrapper">
        <div className="boxFiled">
        <InputBox
        label={5}
        fun={handleDetails}
        value={userDetails.companyName}
        name={"companyName"}
        placeholder={"Enter company Name"}
        type={"text"}
        />
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        fun={handleDetails}
        value={userDetails.companyRole}
        name={"companyRole"}
        placeholder={"Enter company role"}
        type={"text"}
        />
        
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        fun={handleDetails}
        value={userDetails.companyLink}
        name={"companyLink"}
        placeholder={"Enter company Link"}
        type={"text"}
        />
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        fun={handleDetails}
        value={userDetails.expType}
        name={"expType"}
        placeholder={"enter job type"}
        type={"text"}
        />
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        fun={handleDetails}
        value={userDetails.expStartTime}
        name={"expStartTime"}
        placeholder={"enter company join yr"}
        type={"text"}
        />
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        fun={handleDetails}
        value={userDetails.expEndTime}
        name={"expEndTime"}
        placeholder={"enter company end yr"}
        type={"text"}
        />
        </div>
    </div>
    
    <div className="btn_wrapper">
            <Button variant='contained' onClick={uploadDetails}>Save</Button>
        </div>
  </div>
  </>
}

export default Experience