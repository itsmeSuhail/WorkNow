import express from "express"
import { validUser } from "../utils/verifyUser.js";
import jobs from "../models/jobs.model.js";
import appliedSceham from "../models/applied.model.js";
const JobsRouter = express.Router();
JobsRouter.get("/all", async (req, res, next) => {
    const data = await jobs.find();
    return res.status(200).json(data);
});
JobsRouter.get("/distinct-position", async (req, res, next) => {
    try {
        const data = await jobs.find().distinct("position");
        res.status(200).json({ distinct: data });

    } catch (error) {
        return next(error);
    }
});
// JobsRouter.get("/filter", async (req, res, next) => {
//     const { userId } = req.body;
//     try {
//         const { jobType, min, max, position, companyName,page } = req.query;

//         const filter = {
//             ...(companyName && { companyName: { $regex: companyName, $options: "i" } }),
//             ...(min || max) && {
//                 [jobType === "jobs" ? "salary" : "stipend"]: {
//                     ...(min && { $gt: min }),
//                     ...(max && { $lt: max }),
//                 }
//             },
//             ...(jobType==="jobs"?{duration: { $exists:false } }:{duration: { $exists:true} }),
//             ...(position && { position: { $regex: position, $options: "i" } })
//         };


//         console.log(filter)
//         const data = await jobs.find(filter);
//         if (!userId) return res.status(200).json(data);

//         const appliedJobsArr = await appliedSceham.find({ userId }).distinct("jobId");

//         const filteredData = data.filter(job => !appliedJobsArr.includes(job._id.toString()));

//         res.status(200).json(filteredData);
//     } catch (error) {
//         return next(error);
//     }
// });
JobsRouter.get("/filter", async (req, res, next) => {
    try {
        const { jobType, min, max, position, page, userId } = req.query;
        const perPage = 15;
        const currentPage = parseInt(page) || 1;

        const filter = {

            ...(min || max) && {
                [jobType === "jobs" ? "salary" : "stipend"]: {
                    ...(min && { $gt: min }),
                    ...(max && { $lt: max }),
                }
            },
            ...(jobType === "jobs" && { duration: { $exists: false } }),
            ...(jobType === "internship" && { duration: { $exists: true } }),
            ...(position && { position: { $regex: position.toLowerCase().split(" ")[0], $options: "i" } })
        };

        let appliedJobsArr = userId?await appliedSceham.find({ userId }).select("jobId"):[];
        const totalJobsCount = await jobs.countDocuments(filter)-appliedJobsArr.length;
        const totalPages = Math.ceil(totalJobsCount / perPage);

        const data = await jobs.find(filter)
            .skip((currentPage - 1) * perPage)
            .limit(perPage+appliedJobsArr.length);

        if (!userId) {
            return res.status(200).json({ totalJobsCount, totalPages, data });
        }

        

        const appliedJobIds = appliedJobsArr.map(job => job.jobId);


        const filteredData = data.filter(job => {
            return !appliedJobIds.includes(job.id)});


        res.status(200).json({ totalJobsCount, totalPages, data: filteredData });
    } catch (error) {
        return next(error);
    }
});

export default JobsRouter;