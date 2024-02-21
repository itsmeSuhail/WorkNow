import mongoose, { Schema} from "mongoose";
const userPoints = new Schema({
  userid:{type:String},
  points: {
    type: Number, default: 0, min: 0
  },
  name: { type: Number, default: 0 },
  email: { type: Number, default: 0 },
  mobile: { type: Number, default: 15 },
  profilePic: { type: Number, default: 5 },
  linkedin: { type: Number, default: 3 },
  github: { type: Number, default: 5 },
  resume: { type: Number, default: 20 },
  eduType: { type: Number, default: 5 },
  eduName: { type: Number, default: 5 },
  eduStartTime: { type: Number, default: 2 },
  eduStartTime: { type: Number, default: 2 },
  projectName: { type: Number, default: 5 },
  projectDesc: { type: Number, default: 6 },
  peopleInvolve: { type: Number, default: 4 },
  projectLink: { type: Number, default: 10 },
  expType: { type: Number, default: 5 },
  companyName: { type: Number, default: 10 },
  companyLink: { type: Number, default: 10 },
  companyRole: { type: Number, default: 8 },
  expStartTime: { type: Number, default: 2 },
  expEndTime: { type: Number, default: 2 },
  coverLetter:{type:Number,default:10}
});
const userDetails = new Schema({
  name: { type: String, required: [true, "name is required"] },
  email: { type: String, required: [true, "email is required"] },
  mobile: { type: String,default:""},
  otp:{type:String},
  profilePic:{type: String,default:""},
  resume:{type: String,default:""},
  socialMedia: {
    linkedin: { type: String,default:"" },
    github: { type: String,default:"" }
  },
  education: {
    eduType: { type: String, type: String,default:"" },
    eduName: { type: String,default:"" },
    eduStartTime: { type: String,default:"" },
    eduEndTime: { type: String,default:"" }
  }
});
const userProject = new Schema({
  userId:{type:String},
  projectName: { type: String,default:"" },
  projectDesc: { type: String,default:""},
  peopleInvolve: { type: String,default:""},
  projectLink: {type: String,default:"" },
  coverLetter:{type: String,default:""}
})
const userExperience = new Schema({
  userId:{type:String},
  expType: { type: String,default:""},
  companyName: { type: String,default:""},
  companyLink: { type: String,default:""},
  companyRole: {type: String,default:""},
  expStartTime: { type: String,default:""},
  expEndTime: { type: String,default:""},
})
export const userSchema= mongoose.model("userDetails",userDetails)
export const experienceSchema=mongoose.model("userExperience",userExperience);
export const projectSchema=mongoose.model("userProject",userProject);
export const pointSchema=mongoose.model("userPoint",userPoints);
