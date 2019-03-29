const express = require('express'),
      User    = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}).then((users) => {
    res.send(users);
  }).catch((e) => {
    res.status(500).send(e);
  });
});

router.get('/:id', function(req, res, next) {
    const _id = req.params.id;
    User.findById(_id).then((user) => {
      if(!user) {
        return res.status(404).send();
      }
      res.send(user);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

router.post('/', (req, res, next) => {
  const user = new User(req.body);
  User.create(user).then(() => {
      res.status(201).send(user);
  }).catch((e) => {
      res.status(400).send(e);
  });
});


module.exports = router;
