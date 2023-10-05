const express = require('express')
const {getAllUsersController,getAllDoctorsController} = require('../controller/adminCtrl')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

// GET METHOD || users
router.get('/getAllUsers',authMiddleware,getAllUsersController)

// GET METHOD || doctorlist

router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)

module.exports = router