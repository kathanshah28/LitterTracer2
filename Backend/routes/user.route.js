import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const userrouter = Router()

userrouter.route("/register").post(registerUser)
userrouter.route("/login").post(loginUser)

export default userrouter