import express from "express";
import dotenv from "dotenv";
dotenv.config()
import CustomError from "../utils/CustomError/CustomError.js";
import { validUser } from "../utils/verifyUser.js";
import appliedSchema from "../models/applied.model.js"
import {pointSchema} from "../models/user.model.js"
const Applied = express.Router();

Applied.post("/:jobId",validUser, async (req, res, next) => {
    const {jobId}=req.params;
    const { userId,position,companyName,jobType,companyLogo} = req.body;
    try {
       await appliedSchema.create({
        userId,companyName,jobType,companyLogo,position,jobId
       });
       await pointSchema.updateOne(
        {userid: userId },
        { $inc: { points: -50 } } // Use $inc to decrement the points by 50
      );
       res.status(200).json({message:"applied"});
    } catch (error) {
        return next(error);
    }
})
Applied.get("/getall/:userId",validUser,async(req,res,next)=>{
    const {userId}=req.params;
    try {
       const data=await appliedSchema.find({userId});
       res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
})
export default Applied;