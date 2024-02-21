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
import { fetchUserProject } from '../../redux/apiCalls/userProject.api';
const Project = () => {
    const dis=useDispatch();
  const data=useSelector(state=>state.project)
  const {id}=useParams();
  const nav=useNavigate();
  useEffect(()=>{
    if(!id||id==="undefined")nav("/");
  },[id])
    const [userDetails, setuserDetails] = useState({
        projectName:"",projectDesc:"",peopleInvolve:"",projectLink:"",coverLetter:""
    })
    
    useEffect(()=>{
        if(!data.data&&id){
            fetchUserProject(dis,id);
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
        const {data}=await axios.put(`${apiUrl}/user/project/${id}`,{...userDetails},{
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
      Add  Project Details
    </h1>
    <div className="details_wrapper">
        <div className="boxFiled">
        <InputBox
        label={5}
        fun={handleDetails}
        value={userDetails.projectName}
        name={"projectName"}
        placeholder={"Enter project Name"}
        type={"text"}
        />
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        fun={handleDetails}
        value={userDetails.projectDesc}
        name={"projectDesc"}
        placeholder={"Enter project description"}
        type={"text"}
        />
        
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        fun={handleDetails}
        value={userDetails.projectLink}
        name={"projectLink"}
        placeholder={"Enter project Link"}
        type={"text"}
        />
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        fun={handleDetails}
        value={userDetails.peopleInvolve}
        name={"peopleInvolve"}
        placeholder={"enter people involve to create project"}
        type={"text"}
        />
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        fun={handleDetails}
        value={userDetails.coverLetter}
        name={"coverLetter"}
        placeholder={"enter project cover letter"}
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

export default Project