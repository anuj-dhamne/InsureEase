import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "./utils/reminderCron.js"; 

const app= express();

app.use(cors({
    // origin:process.env.CORS_ORIGIN,
    origin:"http://localhost:3000" ,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())


//user route imports 
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter)

// policy route import
import policyRouter from "./routes/policy.routes.js";
app.use("/api/v1/users/policies",policyRouter)

// documnet route import
import documentRouter from "./routes/document.routes.js";
app.use("/api/v1/users/document",documentRouter);

// reminder route import
import reminderRouter from "./routes/reminder.routes.js";
app.use("/api/v1/users/reminder",reminderRouter);

// purchase route import 
import purchaseRouter from "./routes/purchase.routes.js";
app.use("/api/v1/users/purchase",purchaseRouter);

// claim route import 
import claimRouter from "./routes/claim.routes.js";
app.use("/api/v1/users/claim",claimRouter);

// Ai features policy route
import policyRoutes from "./routes/policyRoutes.js"
app.use("/api/v1/users/ai-policy",policyRoutes);

// Admin Router 
import adminRouter from "./routes/admin.routes.js"; 
app.use("/api/v1/admin",adminRouter);


export{app};