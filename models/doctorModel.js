const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName:{
        type:String,
        required:[true,'first name is required']
    },
    lastName:{
        type:String,
        required:[true,'last name is required']
    },

})

const doctorModel = mongoose.model('users',doctorSchema)
module.exports = doctorModel