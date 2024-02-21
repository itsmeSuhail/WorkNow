import mongoose from "mongoose";
const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    position: { type: String, required: true },
    companyName: { type: String, required: true },
    companyLogo: { type: String },
    locationName: { type: String },
    join: { type: String },
    salary: {type:Number},
    exp: {type:Number},
    join:{type:String},
    stipend: {type:Number},
    duration: { type: String }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Jobs", JobSchema);
