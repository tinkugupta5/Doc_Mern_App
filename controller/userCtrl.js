const userModel = require("../models/userModel");
// doc model
const doctorModel = require('../models/doctorModel');

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
//  <!--=============== Login Controller===============-->
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
        message: "user not found",
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
// <!--=============== Applydoctore  CTRL   ===============-->

const applyDoctorController = async(req,res) => {
  try {
    // WE ARE TRYING TO GET DOCTOR DETAILS
    const newDoctor = await doctorModel({...req.body,status:'pending'})
    await newDoctor.save()
    // we have to notify admin too we get the notification for new user 
    const adminUser = await userModel.findOne({isAdmin:true})
    const notification = adminUser.notification
    notification.push({
      type:'apply-doctor-request',
      message:`${newDoctor.firstName} ${newDoctor.lastName} Has Applied for Doctor Account `,
      data:{
        doctorId: newDoctor._id,
        name:newDoctor.firstName.firstName + "  " + newDoctor.lastName,
        onclickPath:'/admin/doctors',
      },
    })
    await userModel.findByIdAndUpdate(adminUser._id,{notification});
    res.status(201).send({
      success:true,
      message:'Doctor Account '
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while applying for doctor'
    })
    
  }
}
// <!--=============== notification ctrl   ===============-->
const getAllNotificationController = async(req,res) => {
try {
  const user = await userModel.findOne({_id:req.body.userId})
  const seennotification = user.seennotification
  const notification = user.notification
  seennotification.push(...notification)
  user.notification = []
  user.seennotification = notification
  const updatedUser = await user.save()
  res.status(200).send({
    success:true,
    message:'all notification marked as read ',
    data:updatedUser
  })
  
} catch (error) {
  console.log(error)
  res.status(500).send({
    message:'Error in notification',
    success: false,
    error
  })
}


}

// <!--=============== Delete notification ctrl   ===============-->
const deleteAllNotificationController = async(req,res) => {
  try {
    const user = await userModel.findOne({_id:req.body.userId})
    user.notification = []
    user.seennotification = []
    const updatedUser = await user.save()
    updatedUser.password = undefined 
    res.status(200).send({
      success:true,
      message:'Notification Deleted Successfully',
      data:updatedUser
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'unable to delete notification '
    })
    
  }

}

module.exports = { loginController, registerController, authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController };
