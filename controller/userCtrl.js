const userModel = require("../models/userModel");

//  <!--=============== Using this we encrypt the password which is entered By use (Hash)   ===============-->
const bcrypt = require("bcryptjs");

//  <!--=============== Register Controller  ===============-->
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "user Already Exist", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

//  <!--=============== Login Controller  ===============-->
const loginController = () => {};

module.exports = { loginController, registerController };
