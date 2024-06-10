
const express = require('express')


const router = express.Router()

/////////////////////////////////////////////////////
// Route handlers
/////////////////////////////////////////////////////

const getAllUsers = (req,res)=>{
    res.status(500).json({
        status : "fail",
        message : "This route is not yet iplemented"
    })
}

const getUser = (req,res)=>{
    res.status(500).json({
        status : "fail",
        message : "This route is not yet iplemented"
    })
}

const createUser = (req,res)=>{
    res.status(500).json({
        status : "fail",
        message : "This route is not yet iplemented"
    })
}

const updateUser = (req,res)=>{
    res.status(500).json({
        status : "fail",
        message : "This route is not yet iplemented"
    })
}

const delteUser = (req,res)=>{
    res.status(500).json({
        status : "fail",
        message : "This route is not yet iplemented"
    })
}

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(delteUser);


module.exports = router