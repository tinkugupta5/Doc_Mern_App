const mongoose = require("mongoose");

//  <!--=============== User Schema ===============-->

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "Password is require"],
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  isDoctor:{
    type:Boolean,
    default:false
  },
  notification:{
    type: Array,
    default: [],
  },
  seennotification:{
    type:Array,default:[],
  }
});

//  <!--=============== Login Controller  ===============-->
// users --> collection name
// userSchema -- >> name of schema
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
