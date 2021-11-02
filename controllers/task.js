const getAllTask = async(req, res) =>{
    res.status(200).json({success: true})
}

const getSingleTask = async(req, res) =>{
    res.status(200).json({success: true})
}

const createTask = async(req, res) =>{
    const {title, description, status} = req.body;
    res.status(200).json({success: true})
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