const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController
} = require("../controller/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//  <!--=============== Router Object  ===============-->
const router = express.Router();

//  <!--=============== Login Router || POST  ===============-->
router.post("/login", loginController);
//  <!--=============== Register Router || POST  ===============-->
router.post("/register", registerController);

//  <!--=============== HOME Router || POST || authh  ===============-->
router.post("/getUserData", authMiddleware, authController);

//  <!--=============== Apply doctor   ===============-->
router.post("/apply-doctor", authMiddleware, applyDoctorController);

router.post("/get-all-notification", authMiddleware, getAllNotificationController);

//  <!--=============== Deleteall-notification   ===============-->
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);

module.exports = router;
