const Task = require('../models/task');

const getAllTask = async(req, res) =>{
    const tasks = await Task.find({createdBy: req.user.userId});
    res.status(200).json({success: true, nbHits:tasks.length, tasks})
}

const getSingleTask = async(req, res) =>{
    res.status(200).json({success: true})
}

const createTask = async(req, res) =>{
    const {title, description, status} = req.body;
    if(!title){
        return res.status(400).json({success:false, msg: "Please provide required fileds"});
    }
    const task = await Task.create({
        title,
        description,
        status: status.toLowerCase(),
        createdBy: req.user.userId
    });

    res.status(201).json({success: true, task});
}

const updateTask = async(req, res) =>{
    res.status(200).json({success: true})
}

const deleteTask = async(req, res) =>{
    res.status(200).json({success: true})
}

module.exports = {
    getAllTask,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask
}