const express = require('express'),
      Task    = require('../models/task'),
      auth    = require('../middleware/auth');
const router  = express.Router();

/* GET Tasks listing. */
router.get('/', auth ,async (req, res) =>{
    const match = {owner: req.user._id};
    const skipping = parseInt(req.query.skip) || 0;
    const limiting = parseInt(req.query.limit) || 0;

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    try {
        const tasks = await Task.find(match).limit(limiting).skip(skipping);
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', auth, async (req, res) =>{
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, owner: req.user._id});
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});


router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
});

// Adding a new Task
router.post('/', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete({_id: req.params.id, owner: req.user._id});
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;