import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true
    },

    garbagePhoto : {
        type : String,
    },

    geolocation : {
        type : String,
        required : true
    },

    status : {
        type :String,
        enum : ['Pending','In-Progress','Resolved'],
        default : 'Pending'
    }
},{
    timestamps : true,
    minimize : true
})

const Report = mongoose.model('Report',reportSchema)

export {Report}