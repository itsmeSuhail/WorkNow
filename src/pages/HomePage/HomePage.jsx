import React, { useEffect, useState } from 'react'
import CategoryCard from '../../Components/CategoryCard/CategoryCard'
import FeaturedBanner from '../../Components/FeaturedBanner/FeaturedBanner'
import Slider from '../../Components/Slider/Slider'
import TrustedBy from '../../Components/TrustedBy/TrustedBy'
import { cards, projects } from '../../data'
import "./HomePage.scss"
import { useMediaQuery } from '@mui/material'
import Favourite from '../../Components/Slider/Favourite'
const HomePage = () => {
  const [itemsToShow, setItemsToShow] = useState(4); // Default number of items to show
  const [itemsToScroll, setItemsToScroll] = useState(3); // Default number of items to show
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 2,
        }
      },{
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
        
      },{
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
        
      }
    ]
  };
  const settings2 = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 2,
        }
      },{
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
        },
        
      },{
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
        
      }
    ]
  };
  useEffect(() => {
    const handleResize = () => {
      // Adjust the number of items to show based on the screen width
      if (window.innerWidth>=1300) {
        setItemsToShow(5);
      } else if (window.innerWidth>=1024) {
        setItemsToShow(4);
      }
      else if (window.innerWidth>=700) {
        setItemsToShow(3);
      }
      else if (window.innerWidth>=570) {
        setItemsToShow(2);
        setItemsToScroll(2);
      }
      
      else {
        setItemsToShow(1);
        setItemsToScroll(1);
      }
    };

    // Initial setup
    handleResize();

    // Attach the event listener
    window.addEventListener('resize', handleResize);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [itemsToScroll]);
  return <>
  <div className="home">

  <FeaturedBanner/>
  <TrustedBy/>
  <Slider settings={settings} arrowsScroll={itemsToScroll}>
    {
      cards.map((item,key)=>(
        <CategoryCard item={item} key={key}/>
        ))
      }
    </Slider>
    <div className="features">
        <div className="container">
          <div className="item">
            <h1>Unlock exciting job and internship opportunities tailored for students like you.</h1>
            <div className="ft-title">
    <img src="./img/check.png" alt="" />
    Opportunities for student budgets
</div>
<p>
    Discover affordable services perfect for student needs. Access quality solutions without breaking the bank.
</p>
<div className="ft-title">
    <img src="./img/check.png" alt="" />
    Quick turnaround on student projects
</div>
<p>
    Get started on your project in no time. Find freelancers ready to work on student assignments promptly.
</p>
<div className="ft-title">
    <img src="./img/check.png" alt="" />
    Secure transactions for student peace of mind
</div>
<p>
    Rest assured with safe and reliable payment methods. Your funds are protected until you're satisfied with the work.
</p>
<div className="ft-title">
    <img src="./img/check.png" alt="" />
    24/7 support tailored for students
</div>
<p>
    Get assistance whenever you need it. Our support team is here to help students around the clock.
</p>

          </div>
          <div className="item">
            <video src="https://video-links.b-cdn.net/media/videolinks/video/haida.MP4" controls />
          </div>
        </div>
      </div>
      <div className="explore">
        <div className="container">
          <h1>Explore the marketplace</h1>
          <div className="items">
            {
              cards.map((card,index)=>(
<div className="item" key={card.id}>
              <div className="imgLayer">
              <img
                src={card.img}
                alt=""
              />
              </div>
              <div className="line"></div>
              <span>{card.title}</span>
            </div>
              ))
            }
            
            
          </div>
        </div>
      </div>
     
      </div>
  </>
}

export default HomePage