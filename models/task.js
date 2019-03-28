const mongoose              = require("mongoose");


var TaskSchema = new mongoose.Schema({
    description: String,
    completed: Boolean
});

module.exports = mongoose.model("Task", TaskSchema);