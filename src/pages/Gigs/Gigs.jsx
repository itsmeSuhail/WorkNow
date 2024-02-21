import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import { gigs } from "../../data";
import GigCard from "../../Components/GigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { basekey } from "../../key";
import { apiUrl } from "../../ApiKeys";
import { Pagination, Stack } from "@mui/material";
import CompanyCard from "../../Components/CompanyCard/CompanyCard";
import getCurrentUser from "../../utils/getCurrentUser";
import { useSelector } from "react-redux";

function Gigs() {
  const [sort, setSort] = useState("All");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const [page, setpage] = useState(1)
  const { search, ...rest } = useLocation();
  const queryParams = new URLSearchParams(search);
  let position = queryParams.get('position');
  const currentUser=getCurrentUser();
  const [userId, setuserId] = useState(localStorage.getItem("mykey")||currentUser?._id);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      axios
        .get(
          `${apiUrl}/job/filter${position?position = search:"?"}&min=${minRef.current.value}&max=${maxRef.current.value}&jobType=${sort==="All"?"":sort}&page=${page}${((userId&&userId!==undefined)||localStorage.getItem("mykey"))&&`&userId=${userId||localStorage.getItem("mykey")}`}`
        )
        .then((res) => {
          return res.data;
        }),
  });


  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
  const userD=useSelector(state=>state.details)

  useEffect(() => {
    refetch();
    setuserId(userD?.data?._id||currentUser?.id)
  }, [sort, position, page]);

  const apply = () => {
    refetch();
  };
  const handleChange = (event, value) => {
    setpage(value);
  };
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Search right jobs/internship for you</span>
        <h1>{position} {data && `${data?.
          totalJobsCount} results found`}</h1>
        <p>
          600+ companies has been listed
        </p>
        <div className="menu">
          <div className="left">
            <span>{sort === "jobs" ? "Salary" : "Stipend"}</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                <span onClick={() => reSort("All")}>All</span>
                <span onClick={() => reSort("jobs")}>Jobs</span>
                <span onClick={() => reSort("internship")}>Internship</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading?<h1>Loading....</h1>: data?.data?.map((job) => (
            <CompanyCard refetch={refetch} key={job._id} data={job} />
          ))}
        </div>
         {isLoading?<h1>Loading....</h1>:data&& <Stack style={{margin:"auto"}} spacing={2}>
            <Pagination count={data?.
totalPages
} page={page} onChange={handleChange} />
          </Stack>}
      </div>
    </div>
  );
}

export default Gigs;