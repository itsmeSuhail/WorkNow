import CustomError from "./CustomError/CustomError.js";
import { verifyToken } from "./TokenManager/index.js";

export const validUser=(req,res,next)=>{
    const token=req.headers.authorization.split(" ").pop()||req.cookies.varifiedUser;
    if(!token)return next(new CustomError("bad credentials",400,{user:"user is not verified"}));
    const isValidToken=verifyToken(token);
    if(!isValidToken)return next(new CustomError("session timeout",400,{tokenExpire:"your token has been expired"}));
    const {id,user}=isValidToken;
    if(id&&user)return next();
    return next(new CustomError("bad credentials",400,{user:"user is not verified"}));
}