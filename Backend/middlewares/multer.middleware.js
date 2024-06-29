import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("inside multer middleware",req.body)
      cb(null,"./uploads/temp")              //in temporary directory
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)     random name generate 
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.originalname)
    }
  })
  
export const upload = multer(
    {
        storage,
    }
)