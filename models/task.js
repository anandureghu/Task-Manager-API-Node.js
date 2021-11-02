const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide title"],
        maxlength: 30
    },
    description: {
        type: String,
        default: "N/A",
    },
    status: {
        type: String,
        default: "pending",
        enum: ['pending', 'completed', 'droped']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, {timestamps: true});

module.exports = mongoose.model('Task', TaskSchema);