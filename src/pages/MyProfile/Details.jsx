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
const Details = () => {
    const dis=useDispatch();
  const data=useSelector(state=>state.details)
  const {id}=useParams();
  const nav=useNavigate();
  useEffect(()=>{
    if(!id||id==="undefined")nav("/");
  },[id])
    const [userDetails, setuserDetails] = useState({
        name:data?.name||'',
        email:data?.email||'',
        mobile:data?.mobile||'',
        profilePic:data?.profilePic||'',
        resume:data?.resume||'',
        socialMedia:{
            linkedin:data?.socialMedia?.linkedin||'',
            github:data?.socialMedia?.github||''
        },
        education:{
            eduType:data?.education?.eduType||'',
            eduName:data?.education?.eduName||'',
            eduStartTime:data?.education?.eduStartTime||'',
            eduEndTime:data?.education?.eduEndTime||''
        }
    })
    const [userDetailsError, setuserDetailsError] = useState({
        name:'',
        email:'',
        mobile:'',
        profilePic:'',
        resume:'',
        socialMedia:{
            linkedin:'',
            github:''
        },
        education:{
            eduType:"",
            eduName:'',
            eduStartTime:'',
            eduEndTime:''
        }
    })
    useEffect(()=>{
        if(!data.data&&id){
            fetchUserDetails(dis,id,null);
        }
      },[id,data])
      useEffect(()=>{
       if(id){
        let parse=JSON.parse(localStorage.getItem("currentUser"));

        if(data?.data)setuserDetails(data?.data);
       }
        // else if(parse){
        //    setuserDetails(parse);
        // }
      },[data.loading])
    const handleDetails=(e)=>{
        const {name,value}=e.target;
        setuserDetails(prev=>{
            setuserDetailsError(prev=>({
                ...prev,[name]:null
            }))
        return{...prev,[name]:value};

        });
    }
   
   const uploadDetails=async()=>{
     try {
        const {data}=await axios.put(`${apiUrl}/user/details/${id}`,{...userDetails,...userDetails.socialMedia,...userDetails.education},{
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
  <div className="details_container">
    <h1>
        Personal Details
    </h1>
    <div className="details_wrapper">
        <div className="boxFiled">
        <InputBox
        label={5}
        fun={handleDetails}
        error={userDetailsError.name}
        value={userDetails.name}
        name={"name"}
        placeholder={"Enter your name"}
        type={"text"}
        />
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        error={userDetailsError.email}

        fun={handleDetails}
        value={userDetails.email}
        name={"email"}
        placeholder={"Enter your email"}
        type={"email"}
        />
        
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        error={userDetailsError.mobile}

        fun={handleDetails}
        value={userDetails.mobile}
        name={"mobile"}
        placeholder={"Enter your phone no."}
        type={"text"}
        />
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        error={userDetailsError.resume}

        fun={handleDetails}
        value={userDetails.resume}
        name={"resume"}
        placeholder={"enter resume google drive link "}
        type={"text"}
        />
        </div>
       
    </div>
    <div className="btn_wrapper">
            <Button variant='contained' onClick={uploadDetails}>Save</Button>
        </div>
  </div>
  <div style={{marginTop:"20px"}} className="details_container">
    <h1>
        Social media Accounts
    </h1>
    <div className="details_wrapper">
        <div className="boxFiled">
        <InputBox
        label={5}
        error={userDetailsError.socialMedia.linkedin}

        fun={(e)=>{
            const {name,value}=e.target;
            setuserDetails(prev=>{
                setuserDetailsError(prev=>({
                    ...prev,socialMedia:{
                        ...prev.socialMedia,
                        [name]:null
                    }
                }))
                return {...prev,socialMedia:{
                    ...prev.socialMedia,
                    [name]:value
                }}
            })
        }}
        value={userDetails.socialMedia.linkedin}
        name={"linkedin"}
        placeholder={"Enter your linkedin url"}
        type={"text"}
        />
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
          error={userDetailsError.socialMedia.github}
         fun={(e)=>{
            const {name,value}=e.target;
            setuserDetails(prev=>{
                setuserDetailsError(prev=>({
                    ...prev,socialMedia:{
                        ...prev.socialMedia,
                        [name]:null
                    }
                }))
                return {...prev,socialMedia:{
                    ...prev.socialMedia,
                    [name]:value
                }}
            })
        }}
        value={userDetails.socialMedia.github}
        name={"github"}
        placeholder={"Enter your github url"}
        type={"text"}
        />
        
        </div>
       
    </div>
    <div className="btn_wrapper">
            <Button variant='contained' onClick={uploadDetails}>Save</Button>
        </div>
  </div>
  <div style={{marginTop:"20px"}} className="details_container">
    <h1>
        Education Details
    </h1>
    <div className="details_wrapper">
        <div className="boxFiled">
        <SelectBox
        error={userDetailsError.education.eduType}
         fun={(e)=>{
            const {name,value}=e.target;
             setuserDetailsError(prev=>({...prev,education:{
                ...prev.education,
                [name]:null
            }}))
            setuserDetails(prev=>({...prev,education:{
                ...prev.education,
                [name]:value
            }}))
        }}
        label={4}
        value={userDetails.education.eduType}
        name={"eduType"}
        options={["School","College"]}
        placeholder={"Select Education Type"}
    
        />
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}

        fun={(e)=>{
            const {name,value}=e.target;
             setuserDetailsError(prev=>({...prev,education:{
                ...prev.education,
                [name]:null
            }}))
            setuserDetails(prev=>({...prev,education:{
                ...prev.education,
                [name]:value
            }}))
        }}
        error={userDetailsError.education.eduName}
        value={userDetails.education.eduName}
        name={"eduName"}
        placeholder={"Enter your school/college name"}
        type={"text"}
        />
        
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
    error={userDetailsError.education.eduStartTime}
        fun={(e)=>{
            const {name,value}=e.target;
            setuserDetailsError(prev=>({...prev,education:{
               ...prev.education,
               [name]:null
           }}))
           setuserDetails(prev=>({...prev,education:{
               ...prev.education,
               [name]:value
           }}))
        }}
        value={userDetails.education.eduStartTime}
        name={"eduStartTime"}
        placeholder={"Enter start year"}
        type={"text"}
        />
        
        </div>
        <div className="boxFiled">
        <InputBox
        label={5}
        error={userDetailsError.education.eduEndTime}
        fun={(e)=>{
            const {name,value}=e.target;
             setuserDetailsError(prev=>({...prev,education:{
                ...prev.education,
                [name]:null
            }}))
            setuserDetails(prev=>({...prev,education:{
                ...prev.education,
                [name]:value
            }}))
        }}
        value={userDetails.education.eduEndTime}
        name={"eduEndTime"}
        placeholder={"Enter last year"}
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

export default Details