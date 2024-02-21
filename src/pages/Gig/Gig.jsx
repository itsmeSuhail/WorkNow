import React, { useEffect } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { basekey } from "../../key";
import { Link, useNavigate, useParams } from "react-router-dom";
import Reviews from "../../Components/Reviews/Reviews";
import getCurrentUser from "../../utils/getCurrentUser";

function Gig() {
  const { id } = useParams();
const nav=useNavigate();
  const { isLoading, error, data,refetch } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      axios.get(`${basekey}/api/v1/gigs/single/${id}`).then((res) => {
        return res.data?.data;
      }),
  });

  const userId = data?.userId;
  const userdatas=getCurrentUser();
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
    refetch:userData
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios.get(`${basekey}/api/v1/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });
useEffect((
)=>{
refetch()
if(userId){
  userData()
}
},[id])
  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              {/* Fiverr {">"} Graphics & Design {">"} */}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={data?.userImg|| "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                  alt=""
                />
                <span>{data?.username}</span>
                {!isNaN(data.totalStars / data.starNumber==0?1:data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber==0?1:data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber==0?1:data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
          <div className="parent_">

            <Slider special={false} slidesToShow={1} arrowsScroll={1} className="slider as">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            </div>

            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={data?.userImg || "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"} alt="" />
                  <div className="info">
                    <span>{data?.username}</span>
                    {!isNaN(data.totalStars / data.starNumber==0?1:data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber==0?1:data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber==0?1:data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>{
              if(userdatas==null||userdatas.email==null||userdatas.username==null){
                nav("/login");
              }else{
                nav(`/pay/${id}`)
              }

            }}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;