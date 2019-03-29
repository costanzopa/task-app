const express = require('express'),
      Task    = require('../models/task');
var   router = express.Router();

/* GET Tasks listing. */
router.get('/', async (req, res) =>{
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', async (req, res, next) =>{
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Adding a new Task
router.post('/', async (req, res) => {
    const task = new Task(req.body);
    try {
        await Task.create(task);
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;