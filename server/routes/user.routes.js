import express from "express";
import {experienceSchema,pointSchema,projectSchema,userSchema} from "../models/user.model.js";
import { validUser } from "../utils/verifyUser.js";
import CustomError from "../utils/CustomError/CustomError.js";
import { flatten } from "../utils/flattenObject.js";
const user = express.Router();
user.get("/details", validUser, async (req, res,next) => {
    try {
        const data=await userSchema.find();
            res.status(200).json({
                message: "user deleted successfully",data
            })
    } catch (error) {
        return next(error);
    }
})
user.route("/details/:id").get(validUser, async (req, res,next) => {
    try {
        const {id}=req.params;
        const data=await userSchema.findById(id);
            res.status(200).json(data)
    } catch (error) {
        return next(error);
    }
}).put(validUser,async(req,res,next)=>{
  try {
    const {id}=req.params;
    const { name, email, mobile, profilePic, linkedin, github, eduType, eduName, eduStartTime, eduEndTime, resume } = req.body;

const education = { ...(eduEndTime&&{eduEndTime}),...(eduType&&{eduType}),...(eduStartTime&&{eduStartTime}),...(eduName&&{eduName}) };

const socialMedia = (linkedin || github) ? { ...(linkedin&&{linkedin}), ...(github&&{github}) } : {};

const haveValues = {
    ...(name && { name }),
    ...(email && { email }),
    ...(mobile && { mobile }),
    ...(profilePic && { profilePic }),
    ...(resume && { resume }),
    ...(Object.keys(socialMedia).length > 0 && { socialMedia }),
    ...(Object.keys(education).length > 0 && { education })
};

    if(Object.keys(haveValues).length===0)return next(new CustomError("fields required",400,{fileds:"please add fields to update"}));
    const pointsObj=await pointSchema.findOne({userid:id});
    
    const produceResult=flatten(haveValues,pointsObj)
    await pointSchema.findOneAndUpdate(
        { userid: id },
        {
            $set: {
                ...produceResult.keys, // Access keys property instead of key
                points: pointsObj.points + produceResult.point // Update points value
            }
        }
    );
    await userSchema.findOneAndUpdate({id},{
        $set:{
            ...haveValues
        }
    })
    res.status(200).json(haveValues);
  } catch (error) {
    return next(error);
  }
})
user.route("/experience/:id").get(validUser,async(req,res,next)=>{
    try {
        const {id}=req.params;
        const data=await experienceSchema.findOne({userId:id});
        res.status(200).json(data);
    } catch (error) {
        return next(error);
        
    }
}).put(validUser,async(req,res,next)=>{
    try {
        const {id}=req.params;
        const { expType,companyName,companyLink,companyRole,expStartTime,expEndTime} = req.body;
    
    
    const haveValues = {
        ...(expType && { expType }),
        ...(companyName && { companyName }),
        ...(companyLink && { companyLink }),
        ...(companyRole && { companyRole }),
        ...(expStartTime && { expStartTime }),
        ...(expEndTime && { expEndTime }),
        
    };
        if(Object.keys(haveValues).length===0)return next(new CustomError("fields required",400,{fileds:"please add fields to update"}));
        const pointsObj=await pointSchema.findOne({userid:id});
        
        const produceResult=flatten(haveValues,pointsObj)
        await pointSchema.findOneAndUpdate(
            { userid: id },
            {
                $set: {
                    ...produceResult.keys, // Access keys property instead of key
                    points: pointsObj.points + produceResult.point // Update points value
                }
            }
        );
        await experienceSchema.findOneAndUpdate({userId:id},{
            $set:{
                ...haveValues
            }
        })
        res.status(200).json(haveValues);
      } catch (error) {
        return next(error);
      }
})
user.route("/project/:id").get(validUser,async(req,res,next)=>{
    try {
        const {id}=req.params;
        const data=await projectSchema.findOne({userId:id});
        res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
}).put(validUser,async(req,res,next)=>{
    try {
        const {id}=req.params;
        const { projectName,projectDesc,peopleInvolve,projectLink,coverLetter} = req.body;
    
    
    const haveValues = {
        ...(projectName && { projectName }),
        ...(projectDesc && { projectDesc }),
        ...(peopleInvolve && { peopleInvolve }),
        ...(projectLink && { projectLink }),
        ...(coverLetter && { coverLetter }),
    };
    
        if(Object.keys(haveValues).length===0)return next(new CustomError("fields required",400,{fileds:"please add fields to update"}));
        const pointsObj=await pointSchema.findOne({userid:id});
        
        const produceResult=flatten(haveValues,pointsObj)
        await pointSchema.findOneAndUpdate(
            { userid: id },
            {
                $set: {
                    ...produceResult.keys, // Access keys property instead of key
                    points: pointsObj.points + produceResult.point // Update points value
                }
            }
        );
        await projectSchema.findOneAndUpdate({userId:id},{
            $set:{
                ...haveValues
            }
        })
        res.status(200).json(haveValues);
      } catch (error) {
        return next(error);
      }
})


// ---------------------------------

export default user;