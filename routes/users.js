const express = require('express'),
      User    = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
    try {
       const users = await User.find({});
       res.send(users);
    }catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if(!user) {
            return res.status(404).send();
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', async (req, res) => {
  const user = new User(req.body);
  await User.create(user);
  try {
      res.status(201).send(user);
  } catch (e) {
      res.status(400).send(e);
  }
});


module.exports = router;
