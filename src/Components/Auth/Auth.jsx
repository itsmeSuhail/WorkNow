import React from 'react'
import "./Auth.scss"
import { Box, Button, LinearProgress, Modal, TextField } from '@mui/material'
import { BackHand, Check, Email, Google, KeyboardBackspace, Lock, Person } from '@mui/icons-material'
import { useState } from 'react'
import Otpform from './Otpform'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { basekey } from '../../key'
import { apiUrl } from '../../ApiKeys'
import { toast } from 'react-toastify'
const Auth = ({ state, handle }) => {
    const [isVerifying, setisVerifying] = useState(false);
    const [error, setError] = useState(null);
    const [loader, setloader] = useState(false)
    const [loader2, setloader2] = useState(false)
    const [userstate, setstate] = useState({
        email: "",
        name: ""
    });
    const getDataNow = async (obj) => {
        setloader(true)
        try {
            const { data } = await axios.post(`${apiUrl}/auth/`, obj,{
                headers: {
                    'Content-Type': 'application/json',
        
                  },
                  withCredentials: true
            });
            setloader(false);
            return data?.data;
        } catch (error) {
            setloader(false);
            setError(error.response.data.body["name"]||error.response.data.body["email"]);
            setTimeout(() => {
                setError("");
            }, 3000)
        }
    }
    const changeEmail = () => {
        setisVerifying(false);

    }
    const setVerify = () => {
        try {
            if(userstate.password!==''&&userstate.email!=''){
                getDataNow(userstate).then(res => {
                    if (res) {
                        toast.success("otp has been sent on your email")
                        setisVerifying(!isVerifying);
                    }
                })
            }else{
                setError("Fields cant be empty");
                setTimeout(() => {
                    setError("");
                }, 3000)
                setloader(false);    
            }
        } catch (error) {
            setError(error.response.data.data);
            setTimeout(() => {
                setError("");
            }, 3000)
            setloader(false);


        }
    }
    const handleChaneg = e => {
        setstate({
            ...userstate, [e.target.name]: e.target.value
        })
    }
    return <>
        <Modal open={state} onClose={handle}>
            <Box className="AuthContainer">
                <div className="left">
                    <h2 className="title">
                        Success starts here
                    </h2>
                    <div className="Items">
                        <div className="item">
                            <Check className='icon_check' />
                            <p className="content">
                                Over 600 companies
                            </p>
                        </div>
                        <div className="item">
                            <Check className='icon_check' />
                            <p className="content">
                                get hired by mnc's
                            </p>
                        </div>
                        <div className="item">
                            <Check className='icon_check' />
                            <p className="content">
                                access to talent and businesses across the globe
                            </p>
                        </div>
                    </div>
                </div>
                <div className="right">
               {loader&& <div className="loader">
                                <LinearProgress/>
                            </div>}
                           {loader2&&
                            <div className="loader">
                            <LinearProgress/>
                        </div>
                           }    

                    <div className="logwithmail">
                        {!isVerifying ? <div className="login_d">
                            
                            <div className="back" >
                               
                                <p className="content" style={{color:"#008BDC",fontWeight:"600"}}>Join Us</p>
                            </div>

                            <h2 className="title">Continue with your email</h2>
                            <div className="form_">
                                <span className="error">
                                    {error && error}

                                </span>
                                <div className="inputform">
                                    <Person className='formicon' />
                                    <TextField fullWidth name='name' id='name' value={userstate.name} onChange={handleChaneg} className='inputfield' type='text' placeholder='enter your name' />
                                </div>
                                <div className="inputform">
                                    <Email className='formicon' />
                                    <TextField fullWidth name='email' id='email' className='inputfield' value={userstate.email} onChange={handleChaneg} type='text' placeholder='enter your email' />
                                </div>
                                
                                <div className="inputform">
                                    <Button disabled={loader} onClick={setVerify} variant='outlined' fullWidth className='submitnow'>Continue</Button>
                                </div>
                            </div>
                        </div> :
                            <div className="confirmMail">
                                <h2 className="title">
                                    Confirm your email
                                </h2>
                                <div className="pShowoptions">
                                    <div className="psubtitle">
                                        Enter the Verification code we emailed to:
                                    </div>
                                    <div className="psubtitle">{userstate.email}<span className='changemail' onClick={changeEmail}>(change email)
                                    </span></div>

                                </div>
                              
                                <Otpform loader={setloader2} handle={handle} />
                            </div>
                        }
                    </div>
                </div>
            </Box>
        </Modal>
    </>
}

export default Auth