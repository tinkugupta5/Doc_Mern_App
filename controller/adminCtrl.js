const { default: Users } = require('../client/src/pages/admin/Users')
const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')


const getAllUsersController = async(req,res) => {
    try {
        const res = await userModel.find({});
        res.status(200).send({
            success:true,
            message:'users data List',
            data:Users,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while fetching users',
            error
        })
    }

}

const getAllDoctorsController = async() => {

    try {
        const res = await doctorModel.find({});
        res.status(200).send({
            success:true,
            message:'doctor data List',
            data:doctors,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while fetching doctors',
            error
        })
    }

}

module.export = { getAllDoctorsController,getAllUsersController};