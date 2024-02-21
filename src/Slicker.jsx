import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./Slicker.css"
import { cards } from './data';

import CategoryCard from './Components/CategoryCard/CategoryCard';
const ResponsiveCarousel = () => {
  
  return (
    <div className="carousel-container">
      <Slider {...settings}>
      {
      cards.map((item,key)=>(
        <CategoryCard item={item} key={key}/>
        ))
      }
      </Slider>
    </div>
  );
};

export default ResponsiveCarousel;
