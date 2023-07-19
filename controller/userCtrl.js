const userModel = require("../models/userModel");

//  <!--=============== Using this we encrypt the password which is entered By use (Hash)   ===============-->
const bcrypt = require("bcryptjs");
//  <!--=============== Using this we encrypt the password which is entered By use (Hash)   ===============-->
const jwt = require("jsonwebtoken");

//  <!--=============== Register Controller  ===============-->
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({message:"Register Sucessfully",success:true})
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller  ${error.message}`,
    });
  }
};

//  <!--=============== Login Controller  ===============-->
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }

    //  <!--=============== JWT TOKENS   ===============-->
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .send({ message: `Login Sucessfully`, success: true, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

//  <!--=============== AuthController Controller  ===============-->
const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not founds",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        // data: {
        //   name: user.name,
        //   email: user.email,
        // },
        data:user
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// <!--=============== Applydoctore   ===============-->

const applyDoctorController = async(req,res) => {
  try {
    
  } catch (error) {

    console.log(error)
    
  }

}

module.exports = { loginController, registerController, authController,applyDoctorController };
