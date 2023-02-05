const express = require("express");
const {
  loginController,
  registerController,
} = require("../controller/userCtrl");

//  <!--=============== Router Object  ===============-->

const router = express.Router();

//  <!--=============== Login Router || POST  ===============-->
router.post("/login", loginController);

//  <!--=============== Register Router || POST  ===============-->
router.post("/register", registerController);

module.exports = router;
