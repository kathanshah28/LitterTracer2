import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userName : {
        type : String,
        required: true,
        unique : true
    },

    email:{
        type: String,
        required: true,
        unique : true
    },

    userType : {
        type : String,
        enum : ['Client','Admin','GarbageCollector'],
        default : 'Client'
    },

    address : {
        Area : {
            type : String,
            required : true
        },
        pincode : {
            type : String,
            required : true
        }
    },

    password : {
        type : String,
        required  :true,
    },

    phoneNumber : {
        type : String,
        required : true
    }


},{
    versionKey : false,
    timestamps : true,
    minimize : true
})


const User = mongoose.model('User',userSchema)

export {User}