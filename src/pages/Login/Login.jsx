import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { basekey } from "../../key";
import { Button, TextField } from "@mui/material";
import { Email } from "@mui/icons-material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${basekey}/api/v1/auth/login`, { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(()=>{
      setError("");
      },3000)
    }
  };
  const [forgotPassword, setforgotPassword] = useState(false);
  const handleSwitch=()=>{
    setforgotPassword(!forgotPassword);
  }
  const [forgotMail,setForgotMail]=useState("");
  const handleForgorMail=async()=>{
    try {
      const res = await axios.post(`${basekey}/api/v1/auth/forgot-password`, {email:forgotMail});
      if(res){
        setforgotPassword(false)
      }
    } catch (error) {
      setError(error.response.data.data);
        setTimeout(()=>{
        setError("");
        },3000)
    }
    
  }
  return (
    <div className="login">
     {!forgotPassword? <form className="forgotPassword" onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <span className="error">
        {error && error}

        </span>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <div className="forgot" onClick={handleSwitch}>forgot password?</div>
      </form>:
      <div className="forgotPassword">
        <h1 className="">Forgot Password</h1>
        <div className="containerForms">
        <span className="error">
        {error && error}
        </span>
          <div className="inputitem">
            <div className="iconcontainer">
              <Email style={{color:"gray"}}/>
            </div>
            <TextField value={forgotMail} onChange={(e)=>{
              setForgotMail(e.target.value)
            }} fullWidth placeholder="enter your email"/>
          </div>
          <div className="inputitem">
            <Button onClick={handleForgorMail} variant="contained" fullWidth>Reset Password</Button>
          </div>
        <div className="forgot" onClick={handleSwitch}>Sign in?</div>
        </div>
      </div>}
    </div>
  );
}

export default Login;