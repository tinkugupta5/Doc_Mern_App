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
  Password: {
    type: String,
    required: [true, "Password is require"],
  },
});

//  <!--=============== Login Controller  ===============-->
// users --> collection name
// userSchema -- >> nameof schema
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
