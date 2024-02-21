import { Camera } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import "./MyProfile.scss"
import { Button } from '@mui/material'
import Tabs from "./Tabs"
import getCurrentUser from '../../utils/getCurrentUser'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { apiUrl } from '../../ApiKeys'
import Cookies from 'js-cookie'
import { fetchUserDetails } from '../../redux/apiCalls/userDetails.api'
import { fetchUserPoints } from '../../redux/apiCalls/userPoints.api'
const MyProfile = () => {
  const {id}=useParams()
  const nav=  useNavigate()
  const user=  getCurrentUser();
  useEffect(()=>{
    if(!user||id===undefined||id===null||id.trim()===''){
      nav("/")
    }
  },[id])
  const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "fiverrfol");
  
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/itsmearyan/upload", data);
  
      const { url } = res.data;
      return url;
    } catch (err) {
    }
  };
    
    
    const imageChange=(e)=>{
      setprofilePic(e.target.files[0]);
    }
    const [profilePic, setprofilePic] = useState(null);
    const data=useSelector(state=>state.details);
    const dis=useDispatch();
    useEffect(()=>{
     if(id){
      if(data?.data)setprofilePic(data?.data.profilePic);
     }

    },[data.loading])
 
 
 const uploadDetails=async()=>{
   try {
               const url=await upload(profilePic);
               setprofilePic(url)
      const {data}=await axios.put(`${apiUrl}/user/details/${id}`,{profilePic:url},{
          headers: {
              Authorization: `Bearer ${Cookies.get("varifiedUser")}` // Attach the Authorization header
          }
      });
      if(data){
          localStorage.setItem("currentUser",JSON.stringify(data));
          fetchUserDetails(dis,null,data);
          fetchUserPoints(dis,id);
          toast.success("Data updated");
      }
   } catch (error) {
      toast.error("something went wrong");
   }
 }
    
  return <>
  <div className="container">
    <div className="bg_container">
        <div className="userProfile">
        <div className="uploader_Img">
        <div className="imgContainer">
                <img src={profilePic?typeof profilePic==="string"?profilePic:URL.createObjectURL(profilePic):"/accounts.webp"} alt="" className="userimg" />
                <div className="uploaderShow">
                  <label className='ds' htmlFor="file">
                    <div className="changeimg">
                      <Camera />
                    </div>
                    <div className="titleshow">
                      change image
                    </div>
                  </label>
                  <input onChange={imageChange} type="file" name="file" hidden id="file" />
                </div>
              </div>
              <div className="btn_Wrapper">
                <Button onClick={uploadDetails} variant='outlined'  style={{color:"white",background:"black"}}>Upload</Button>
              </div>
        </div>
                     </div>
    </div>
    <div className="content_">
        <Tabs/>
    </div>
  </div>
  </>
}

export default MyProfile