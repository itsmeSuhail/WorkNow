import { Box, Drawer } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import getCurrentUser from '../../utils/getCurrentUser';
import { basekey } from '../../key';
import axios from 'axios';

const SmBar = ({ openModal, setModal }) => {
  const currentUser = getCurrentUser();
const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${basekey}/api/v1/auth/logout`);
      localStorage.setItem("currentUser", null);
      navigate("/");
      setModal()
    } catch (err) {
    }
  };
  return <>
    <Drawer
      open={openModal}
      onClose={setModal}
    >
      <Box className="listContainer" style={{ width: "250px", color: "white" }}>
        <h2 className="smtitle">HireMe</h2>
        <div className="optionList">
          <div className="options">
            <Link to="/gigs?cat=graphic" className="option">Explore</Link>
          </div>
          {
            !currentUser?<>
            <div className="options">
            <Link to="/login" className="option">Sign in</Link>
          </div>
          <div className="options">
            <Link to="/register" className="option">Join us</Link>
          </div></>:<>
          
         {
          currentUser?.isSeller&&<>
           <div className="options">
            <Link to="/mygigs" className="option">Gigs</Link>
          </div>
          <div className="options">
            <Link to="/add" className="option">Add new</Link>
          </div>
          </>
         }
         
          <div className="options">
            <Link to="/orders" className="option">Orders</Link>
          </div>
          <div className="options">
            <Link to="/messages" className="option">Messages</Link>
          </div>
          <div className="options">
            <Link to={`/my-profile/${currentUser._id}`}className="option">Profile</Link>
          </div>
          <div className="options">
            <div onClick={() => {
              handleLogout()
            }} className="option">Logout</div>
          </div>
          </>
          }
         
        </div>
      </Box>
    </Drawer>

  </>
}

export default SmBar