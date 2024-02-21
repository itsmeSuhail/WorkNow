import React, { useEffect, useState } from 'react'
import "./Navbar.scss"
import "./SmBar.scss"
import {Link,useLocation, useNavigate} from "react-router-dom"
import getCurrentUser from '../../utils/getCurrentUser';
import {basekey} from "../../key"
import axios from 'axios';
import { AccountCircle, MenuOpen, MenuRounded, NotificationAddRounded, Notifications } from "@mui/icons-material"
import SmBar from "./SmBar"
import { AppBar, Badge, MenuItem, Toolbar, Menu, IconButton, Drawer, Box, useMediaQuery, Tabs, Tab, Avatar } from '@mui/material'
import Auth from '../Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { apiUrl } from '../../ApiKeys';
import Cookies from 'js-cookie';
import { emptyPoints, fetchUserPoints } from '../../redux/apiCalls/userPoints.api';
const Navbar = () => {

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const userPoints=useSelector(state=>state.points)

  const handleClose = () => {
    setAnchorEl(null);
  };
const [openModal, setopenModal] = useState(false);
const setModal=()=>{
  setopenModal(!openModal);
}
const navigate = useNavigate();
const currentUser=getCurrentUser();
const dis =useDispatch()

const {pathname}=useLocation();
const handleLogout = async () => {
  try {
    await axios.post(`${apiUrl}/auth/logout`,null,{
      headers:{
        Authorization:`Bearer ${Cookies.get("varifiedUser")}`
      }
    });
    localStorage.removeItem("currentUser");
    emptyPoints(dis)
    navigate("/");
  } catch (err) {
  }
};
const [showMenu, setshowMenu] = useState(false);
function scrollCb(){
  var scroll = this.pageYOffset;
          if(scroll>=195){
              setshowMenu(true)
          }else{
              setshowMenu(false);
          }            
                }
useEffect(() => {
        window.addEventListener("scroll",scrollCb)
  
        return () => {
          window.removeEventListener("scroll",scrollCb);
        }
      }, []);
      const [value, setValue] = useState(0);
      const handleChanger = (event, newValue) => {
        setValue(newValue);
      };
      const [optionselector, setoptionselector] = useState(-1)
    useEffect(()=>{
      return ()=>{
        setoptionselector(-1);
      }
    },[])
    const [showLoginModal, setshowLoginModal] = useState(false);
    const loginModalHandler=()=>{
      setshowLoginModal(!showLoginModal);
    }
  const [userPointValue, setuserPointValue] = useState(0)
  useEffect(()=>{
    if(currentUser)fetchUserPoints(dis,currentUser?._id)
   console.log("no loading")
  },[])
  useEffect(()=>{
    setuserPointValue(userPoints.data)
  },[userPoints.data])
  
  return <>
   <SmBar openModal={openModal} setModal={setModal} />
   <Auth
   handle={loginModalHandler}
   state={showLoginModal}
   />
    <AppBar className={(showMenu|| pathname!=="/")?"navbar active":"navbar"}>
      <Toolbar>
        <div className="navContainer">
          <div className="left">
            <div className="small_screen">
              <IconButton onClick={setModal} color="inherit" aria-label="open drawer">
                <MenuRounded />
              </IconButton>
            </div>
            <h2 className="title">
              <Link to="/" className='link'>workNow</Link>
            </h2>
          </div>
          <div className="right">
            <div className="linkParent">
              <Link to="/jobs" className='link'>filter jobs</Link>
            </div>
            
            <div className="linkParent notification">
             <IconButton>
             <Badge badgeContent={userPointValue} color="error">
                <Notifications className="notification"/>
              </Badge>
             </IconButton>
            </div>
          {!currentUser&&  <div onClick={loginModalHandler} className="linkParent notification">
              Join
            </div>}
            {
              currentUser&&
            
            <div className="user_Icon ">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={currentUser?currentUser.profilePic:""} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                
                <MenuItem onClick={handleClose}>
                <Link className='link' to={`/applied/${currentUser._id}`}>applied jobs</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                <Link className='link' to={`/my-profile/${currentUser._id}`}>Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <div onClick={handleLogout}>Logout</div>
                </MenuItem>
              </Menu>
            </div>
            }
          </div>
        </div>
      </Toolbar>
    </AppBar>
    {(pathname==='/jobs')&&
    <>
        <hr />
    <div className="menuPro">
    <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
      {
        ["React Developer","Node Developer","Mern Developer","Python Developer","Software Developer","Fullstack Developer","Frontend Developer","Backend Developer","UX Researcher","Django Developer","Angular Developer"
      ].map((item,index)=>(
        <Tab  className='tabpro' label={<Link onClick={()=>{
          setoptionselector(index)
        }} style={{color:optionselector==index?"#7d7ddc":"unset"}} key={index} className="link menuLink" to={`/jobs?position=${item}`}>
        {item}
      </Link>} />
        
      ))
      }
    </Tabs>
    </div>
    <hr />
    </>}
  </>
}

export default Navbar