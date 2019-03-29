const express = require('express'),
      Task    = require('../models/task');
var   router = express.Router();

/* GET Tasks listing. */
router.get('/', function(req, res, next) {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.send(e);
    });
});

// Adding a new Task
router.post('/', (req, res, next) => {
    const task = new Task(req.body);
    Task.create(task).then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        console.log(e);
        res.status(400).send(e);
    });
});


module.exports = router;