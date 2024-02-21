import express from "express";
import dotenv from "dotenv";
dotenv.config()
import {userSchema,pointSchema, experienceSchema, projectSchema} from "../models/user.model.js";
import { CreatToken, CreatTokenWithTime, verifyToken, verifyTokenWithTime } from "../utils/TokenManager/index.js"
import { sendNotification } from "../utils/Email/custom.js";
import CustomError from "../utils/CustomError/CustomError.js";
import { validUser } from "../utils/verifyUser.js";
const Auth = express.Router();

Auth.post("/", async (req, res, next) => {
    const { email, name } = req.body;
    try {
        let isuser = await userSchema.findOne({ email});
        if (!isuser) {
            isuser = await userSchema.create({ name, email });
            await pointSchema.create({
                points: 2,
                userid:isuser.id
            })
            await experienceSchema.create({userId:isuser.id});
            await projectSchema.create({userId:isuser.id});
        }
        if(isuser.name!==name)return next(new CustomError("bad credentials",400,{name:"name is not valid"}))
        const {  _id } = isuser;
        const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 4-digit OTP
        const subject = 'please verify your identity';
        const html = `
        <p>Hello <strong>${name}</strong></p>
        <p>Now you can access portal</p>
        <p>Here is your OTP: <strong>${otp}</strong></p>
        <p>This code will expire in 55 minutes.</p>
        <p>Please don't share this code with anyone.</p>
      `;

        const obj = { otp ,id:_id};
        const token = CreatTokenWithTime(obj, "5m");
        await userSchema.findOneAndUpdate({ _id }, { $set: { otp } }, { new: true });
        // await sendNotification(email,  html,subject)
        res.cookie("userAuthKey", token, {
             maxAge: 3600000
        }).status(200).json({ message: "sucess", data: "otp has been sent successfully",otp });

    } catch (error) {
        return next(error);
    }
})
Auth.post("/verify/otp/", async (req, res, next) => {
    try  {
        const userToken=req.headers.authorization.split(" ").pop()||req.cookies.userAuthKey;
        if(!userToken)return next(new CustomError("bad credentials",400,{access:"you are not valid user"}));
        const token = verifyToken(userToken);
        if(!token)return next(new CustomError("session timeout",400,{tokenExpire:"your token has been expired"}))
        const {id,otp}=token;
        const user = await userSchema.findById(id);
        if(!user)return next("not found",404,{user:"user does not exist"});
        if (parseInt(req.body.otp)===parseInt(otp)&&parseInt(otp)===parseInt(user.otp)) {
            const data = await userSchema.findByIdAndUpdate({_id:id}, {
                $unset: { otp: 1}
            }, { new: true })
            const obj = {
                id: data._id,
                user: data.name,
            }
            const token = CreatToken(obj);
            res.clearCookie("userAuthKey");
            res.cookie("varifiedUser", token, {
                maxAge: 3600000
            }).status(200).json(data)
        } else {
            return next(new CustomError("invalid credentials",400,{otp:"otp is not valid"}))
        }
    }
    catch (error) {
   return next(error)
    }
})
Auth.post("/logout",validUser, async (req, res, next) => {
    try {
        res.status(200).json({message:"user has been logout successfully"})
    } catch (error) {
        return next(error);
    }
});
export default Auth;