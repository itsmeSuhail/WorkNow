import expres from "express";
import cors from "cors"
import dotenv from "dotenv";
import { connectDb } from "./utils/ConnectDb.js"
import cookieParser from "cookie-parser";
import globalErrorHandler  from "./controller/error.controller.js"
import authRouter from "./routes/Auth.route.js"
import userRouter from "./routes/user.routes.js"
import appliedjobRouter from "./routes/appliedJobs.route.js"
import jobRouter from "./routes/jobs.route.js"
import pointRouter from "./routes/userpoints.route.js"
dotenv.config();

const port = process.env.PORT || 3001;
const mongoURL = process.env.mongoURL;
const app = expres();
const corsOptions = {
    origin:"http://localhost:5173"|| process.env.link, 
    credentials: true,
  };
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(expres.json())

//Connect dataBase
connectDb(mongoURL);
//routes
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/applyforjob",appliedjobRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/mypoints",pointRouter)

app.use(globalErrorHandler)
app.listen(port, () => { console.log(`server is started at http://localhost:${port}`) })