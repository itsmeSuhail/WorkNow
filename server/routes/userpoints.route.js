import express from "express";
import { validUser } from "../utils/verifyUser.js";
import {pointSchema} from "../models/user.model.js"
import CustomError from "../utils/CustomError/CustomError.js";
const pointRouter =express.Router();
pointRouter.get("/:userId",validUser, async(req,res,next)=>{
    const {userId}=req.params;
    try {
        if(!userId)return next(new CustomError("invalid id",400,{user:"id is not valid"})); 
        const data=await pointSchema.findOne({userid:userId}).select("points");
        if(!data)return next(new CustomError("invalid id",400,{user:"you dont have access"}));
        return res.status(200).json({points:data.points});
    } catch (error) {
        return next(error);
    }
})
export default pointRouter;