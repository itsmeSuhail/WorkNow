import axios from 'axios';
import React, { useEffect } from 'react'
import { apiUrl } from '../../ApiKeys';
import "./CompanyCard.scss"
import { Button, Card, CardActionArea, CardActions } from '@mui/material';
import { PiCoinsDuotone } from "react-icons/pi";
import getCurrentUser from '../../utils/getCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const CompanyCard = ({ data, hasApplied ,refetch}) => {
    let jobType = "Job";
    if (data["duration"]) {
        jobType = "Internship"
    }
    const { _id, position, companyLogo, companyName, salary, exp, locationName, join, stipend } = data;
    const user = getCurrentUser();
    const points = useSelector(state => state.points);
    const dis = useDispatch();
    const applyForJob = async () => {
        if (!user) {
            toast.error("Please login");
            return;
        }
    
        const details = {
            userId: user._id,
            companyLogo,
            companyName,
            position,
            jobId: _id
        };
    
        try {
            const { data } = await axios.get(`${apiUrl}/mypoints/${details.userId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("varifiedUser")}` // Attach the Authorization header
                }
            });
    
            if (data.points >= 50) {
                const hasEnoughAmount = await axios.post(`${apiUrl}/applyforjob/${details.jobId}`, details, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("varifiedUser")}` // Attach the Authorization header
                    }
                });
                refetch();
            } else {
                toast.error("You don't have enough points");
            }
        } catch (error) {
            // Handle errors appropriately, e.g., display an error toast
            toast.error("An error occurred while applying for the job");
        }
    };
    

    return <>
        <Card className='companyCard' >
            <CardActionArea>
                <div className="actionContainer">

                    <div className="companyProfile">
                        <div className="Initialdetails">
                            <div className="positionName">
                                {position}
                            </div>
                            <div className="companyName">{companyName}</div>
                        </div>
                        <div className="imgContainer">
                            <img src={companyLogo} alt="my company" />
                        </div>
                    </div>
                    <div className="detailsContainer">
                        {!hasApplied && <>
                            <div className="option">
                                <div className="key">locaion</div>
                                <div className="value">{locationName}</div>
                            </div>
                            <div className="option">
                                <div className="key">{jobType == "Job" ? "salary" : "stipend"}</div>
                                <div className="value">{jobType == "Job" ? salary : stipend == 0 ? "unpaid" : stipend}</div>
                            </div>
                            <div className="option">
                                <div className="key">experience</div>
                                <div className="value">{exp}</div>
                            </div>
                            <div className="option">
                                <div className="key">join</div>
                                <div className="value">{join.toLowerCase().endsWith("starts") ? "Starts Immediately" : join}</div>
                            </div>
                        </>}
                        <div className="option">
                            <div className="key">jobType</div>
                            <div className="value">{jobType}</div>
                        </div>
                        {hasApplied && <div className="option">
                            <div className="key">Apply date</div>
                            <div className="value">{"12/2/2024 11:00pm"}</div>
                        </div>}
                    </div>
                </div>

            </CardActionArea>
            <CardActions>
                <div className="btnContainer">
                    <Button variant='outlined'>50 <PiCoinsDuotone color='#c5a300' fontSize={"20px"} /></Button>
                    <Button onClick={applyForJob} disabled={hasApplied} variant='contained'>{!hasApplied ? "Apply" : "Applied"}</Button>
                </div>
            </CardActions>
        </Card>
    </>
}

export default CompanyCard