import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          <div className="user">
            <img src={item?.userImg?item.userImg:"https://images.pexels.com/photos/720598/pexels-photo-720598.jpeg?auto=compress&cs=tinysrgb&w=1600"} alt="" />
            <span>{item?.username?item.username:"Anonymous"}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{item.starNumber}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              {/* <sup>99</sup> */}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;