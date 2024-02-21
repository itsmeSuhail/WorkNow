import mongoose, { Schema } from "mongoose";
const appliedSchema=new Schema({
    userId:{type:String},
    jobId:{type:String},
    position:{type:String},
    companyName:{type:String},
    jobType:{type:String,enum:["internship","job"]},
    companyLogo:{type:String},
    date:{type:Date,default:Date.now()}
})
export default mongoose.model("appliedJobs",appliedSchema)