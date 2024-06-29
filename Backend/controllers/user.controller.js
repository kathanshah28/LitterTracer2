import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bycrypt from 'bcrypt'
import validator from "validator";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateToken = async (id)=>{
    return jwt.sign({
        id : id
    },process.env.REFRESH_TOKEN_SECRET)
}

const registerUser = asyncHandler(async (req,res)=>{
    const {userName, email, password, userType, address, phoneNumber} = req.body

    if([userName, password, phoneNumber].some((field)=>field?.trim() === "")){
        throw new ApiError(400,"All field are Mandatory")
    }

    if(!validator.isEmail(email)){
        throw new ApiError(401,"Please provide valid email address.")
    }

    const existedUser = await User.findOne({
        $or : [{userName, email}]
    })

    if(existedUser){
        throw new ApiError(401,"User with the given credentials already exist.")
    }

    const newUser = await User.create({
        userName : userName,
        userType : userType,
        email : email,
        password : bycrypt.hashSync(password,8),
        phoneNumber : phoneNumber,
        address : address
    })

    if(!newUser){
        throw new ApiError(401,"Error while creating user in the database.")
    }

    const token = await generateToken(newUser._id)

    return res
    .status(201)
    .json(new ApiResponse(201,{newUser,token},"User Successfully Created."))

})


const loginUser = asyncHandler(async(req,res)=>{
    const {userName, email, password} = req.body

    if([userName, password, email].some((field)=>field?.trim() === "")){
        throw new ApiError(400,"All field are Mandatory")
    }

    if(!validator.isEmail(email)){
        throw new ApiError(401,"Please provide valid email address.")
    }

    const existedUser = await User.findOne({
        $or : [{
            userName,email
        }]
    })

    if(!existedUser){
        throw new ApiError(400,"User with the given credentials doesn't exist.")
    }

    const isPasswordMatch = await bycrypt.compareSync(password,existedUser.password)

    if(!isPasswordMatch){
        throw new ApiError(401,"The Credentials are incorrect please check again.")
    }

    const token = await generateToken(existedUser._id)

    return res.status(201)
    .json(new ApiResponse(201,{existedUser,token},"User Successfully logined."))

})

export {registerUser,loginUser}