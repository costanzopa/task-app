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


router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
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