const Task = require('../models/task');

const getAllTask = async(req, res) =>{
    let queryString = {};
    const {completed, pending, droped} = req.query;
    if(completed){
        queryString.status = "completed";
    }
    if(pending){
        queryString.status = "pending";
    }
    if(droped){
        queryString.status = "droped";
    }

    let tasks = await Task.find({createdBy: req.user.userId}); 

    if(queryString.status){
        tasks = await Task.find({createdBy: req.user.userId, status: queryString.status});  
    }
         
    res.status(200).json({success: true, nbHits:tasks.length, tasks})
}

const getSingleTask = async(req, res) =>{
    const {id: taskId} = req.params;
    
    try {
        const task = await Task.findOne({createdBy: req.user.userId, _id: taskId});
        if(!task){
            res.status(404).json({success: false, msg: `No task with ${taskId}`});
        }
        res.status(200).json({success: true, task});
    } catch (error) {
        res.status(404).json({success: false, msg: `No task with ${taskId}`});
    }
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
    const {id: taskId} = req.params;
    try {
        const task = await Task.findByIdAndUpdate({_id: taskId, createdBy: req.user.userId}, req.body, {new: true, runValidators: true});
        if(!task){
            res.status(404).json({success: false, msg: `No task with ${taskId}`});
        }
        res.status(200).json({success: true, task});
    } catch (error) {
        res.status(404).json({success: false, msg: `No task with ${taskId}`});
    }
}

const deleteTask = async(req, res) =>{
    const {id: taskId} = req.params;
    try {
        const task = await Task.findOneAndRemove({_id: taskId, createdBy: req.user.userId});
        if(!task){
            res.status(404).json({success: false, msg: `No task with ${taskId}`});
        }
        res.status(200).json({success: true, task});
    } catch (error) {
        res.status(404).json({success: false, msg: `No task with ${taskId}`});
    }
}

module.exports = {
    getAllTask,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask
}