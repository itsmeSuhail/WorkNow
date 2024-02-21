import React, { useState } from 'react'
import "./FeaturedBanner.scss"
import { Link, useNavigate } from 'react-router-dom';
const FeaturedBanner = () => {
    const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/jobs?position=${input}`);
  };
  const redirect=source=>{
    navigate(source)
  }
    return <>
        <div className="featured">
            <div className="container">
                <div className="left">
                    <h1>Find the perfect <i>Job</i> for you</h1>
                    <div className="search">
                        <div className="searchInput">
                            <img onClick={handleSubmit} src="./img/search.png" alt="" />
                            <input type="text" placeholder='search jobs' onChange={(e) => setInput(e.target.value)} />
                        </div>
                    </div>
                    <div className="popular">
                        <span>Popular:</span>
                        {
                            ["Mern","Reactjs","Nodejs","Python"].map((item,index)=>(
                             <button onClick={()=>{
                                redirect(`/jobs?position=${item}`)
                             }} key={index} className='shortcutBtn'>
                             {item}
                             </button>

                            ))
                        }
                        
                    </div>
                </div>
                <div className="right">
                    <img src="./img/man.png" alt="featured-images" />
                </div>
            </div>
        </div>
    </>
}

export default FeaturedBanner