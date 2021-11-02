const express = require('express');
const router = express.Router();

const {getAllTask, getSingleTask, createTask, updateTask, deleteTask} = require("../controllers/task");

router.route("/").get(getAllTask).post(createTask);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;