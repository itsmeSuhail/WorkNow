import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { apiUrl } from "../../ApiKeys";
import CompanyCard from "../../Components/CompanyCard/CompanyCard";
import "./AppliedForJobs.scss"
import { useDispatch, useSelector } from "react-redux";
import { fetchAppliedJobs } from "../../redux/apiCalls/appliedJob.api";
function Gigs() {
    const {id}=useParams();
   const dis= useDispatch();
   const {data,loading,error}=useSelector(state=>state.appliedJob)
  useEffect(() => {
        fetchAppliedJobs(dis,id);
  }, [id]);

  
  return (
    <div className="Applied">
      <div className="container">
        <span className="breadcrumbs">Search right jobs/internship for you</span>
        <h1>Applied Jobs</h1>
        <p>
          600+ companies has been listed
        </p>
        
        <div className="cards">
            {
                data?.length===0&&<h1 style={{textAlign:"center",width:"100%"}}>You have not applied to any job</h1>
            }
          {loading?<h1>Loading....</h1>: data?.map((job) => (
            <CompanyCard key={job._id} data={job} hasApplied={true} />
          ))}
        </div>
         
      </div>
    </div>
  );
}

export default Gigs;