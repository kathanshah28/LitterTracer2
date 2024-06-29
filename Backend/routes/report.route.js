import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createReport,fetchAllReportsByUserID } from "../controllers/report.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const reportRouter = Router()

reportRouter.route('/addreport').post(authMiddleware,upload.single('photo'),createReport)
reportRouter.route('/fetchreportsbyuserid').get(authMiddleware,fetchAllReportsByUserID)

export default reportRouter