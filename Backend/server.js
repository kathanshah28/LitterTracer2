import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express'
import { ApiResponse } from "./utils/apiResponse.js";
import { connectDB } from "./db/index.js";

//.env file config
dotenv.config({
    path : './.env'
})

//app config

const app = express()

//middleware


app.use(express.json())           //body parser to json
app.use(cors())                   //access backend from any frontend

app.get('/api/v1/',(req,res)=>{
    res.status(201).json(new ApiResponse(201,{},"Server Connection Succesful"))
})

//user router setup

import userrouter from './routes/user.route.js';
app.use('/api/v1/user',userrouter)


//report router setup

import reportRouter from './routes/report.route.js';
app.use('/api/v1/report',reportRouter)


//DBconnection
connectDB().then(()=>{
    app.on("error",(error)=>{
        console.log("Failed to establish connection between app and database.",error)
    })
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server started at port ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log("database connection failed",err)
})    
