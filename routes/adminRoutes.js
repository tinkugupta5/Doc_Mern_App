const express = require('express')
const {getAllUsersController,getAllDoctorsController,changeAccountStatusController} = require('../controller/adminCtrl')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

// GET METHOD || users
router.get('/getAllUsers',authMiddleware,getAllUsersController)

// GET METHOD || doctorlist

router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)

//POST Account Status
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController);

module.exports = router