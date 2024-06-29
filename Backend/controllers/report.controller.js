import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Report } from "../models/report.model.js";
import fs from "fs"
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createReport = asyncHandler(async(req,res)=>{
    const {latitude, longitude, status} = req.body

    if([latitude, longitude].some((field)=>field?.trim() === "")){
        throw new ApiError(401,"All fields are mandatory.")
    }

    const user_id = req.user.user_id

    const existedReport = await Report.findOne({
        $and : [{user_id,geolocation: `https://maps.google.com/?q=${latitude},${longitude}`}]
    })

    if(existedReport){
        fs.unlinkSync(req.file?.path)
        throw new ApiError(300,"Report for the same location is already exist. Thank you for the contribution.")
    }

    const GarbagePhotoLocalPath = req.file?.path

    if(!GarbagePhotoLocalPath){
        throw new ApiError(401,"GarbagePhoto file path not found.")
    }

    const uploadGarbagePhoto = await uploadOnCloudinary(GarbagePhotoLocalPath)

    if(!uploadGarbagePhoto){
        throw new ApiError(400,"Error while uploading photo to the cloudinary database.")
    }

    const newReport = await Report.create({
        user_id : user_id,
        garbagePhoto : uploadGarbagePhoto.url,
        geolocation : `https://maps.google.com/?q=${latitude},${longitude}`,
        status : status
    })

    if(!newReport){
        throw new ApiError(401,"Errro while creating new report in the database.")
    }

    return res.status(201)
    .json(new ApiResponse(201,newReport,"New report created successfully."))
})

const fetchAllReportsByUserID = asyncHandler(async(req,res)=>{
    const Reports = await Report.find({user_id : req.user.user_id})

    if(!Reports){
        throw new ApiError(401,"There are no reports posted by this user.")
    }

    return res.status(201)
    .json(new ApiResponse(201,Reports,"All reports by this user Fetched Successfully."))
})

const updateReportStatus = asyncHandler(async(req,res)=>{
    const updatedstatus = req.body.status

    const report = await Report.findByIdAndUpdate(req.body._id,{
        status : updatedstatus
    })

    if(!report){
        throw new ApiError(401,"There is a problem while updatig the status of the selected report.")
    }

    return res.status(201)
    .json(new ApiResponse(201,report,"Status Successfully updated."))

    
})



export {createReport,fetchAllReportsByUserID,updateReportStatus}
