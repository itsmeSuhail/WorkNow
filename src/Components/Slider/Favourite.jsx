import React from 'react'
import "./Slider.scss"
import SliderComponent from 'infinite-react-carousel'
import {cards} from "../../data"
import Sliders from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CategoryCard from '../CategoryCard/CategoryCard'
const Favourite = ({children, settings,arrowsScroll}) => {
  

  return <>
  <div className="slider">
    <h2>select a category</h2>
    <div className="container">
    <Sliders {...settings}>
        {
          children
        }
          </Sliders>

    </div>
  </div>
  </>
}

export default Favourite