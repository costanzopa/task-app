const mongoose = require("mongoose");


var TaskSchema = new mongoose.Schema({
    description: String,
    completed: Boolean
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;