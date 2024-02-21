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
import path from"path"
import { URL } from 'url';


const port = process.env.PORT || 3001;
const mongoURL = process.env.mongoURL;
const app = expres();
const corsOptions = {
    origin:"/"|| process.env.link, 
    credentials: true,
  };
  app.use(expres.static('dist'));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(expres.json())
const __dirname = new URL('.', import.meta.url).pathname;
//Connect dataBase
connectDb(mongoURL);
//routes
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/applyforjob",appliedjobRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/mypoints",pointRouter)

app.use(globalErrorHandler)
app.get("*",(req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(port, () => { console.log(`server is started at http://localhost:${port}`) })