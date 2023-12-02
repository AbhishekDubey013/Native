const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    employeeId:{
        type:String,
        required:true,
        unique:true,
    },
    employeeName:{
        type:String,
        required:true
    },
    image:{
       type:Buffer,
       required:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const image = mongoose.model("image",imageSchema);

module.exports = image;