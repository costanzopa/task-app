const mongoose = require('mongoose'),
      jwt      = require('jsonwebtoken'),
      User = require('../../src/models/user'),
      Task = require('../../src/models/task');


const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Pablo Costanzo',
    email: 'costanzopa@example.com',
    password: '12345678',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
};


const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Agustin Gomez',
    email: 'gomeza@example.com',
    password: 'kaksmfkfkola',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
};


const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'My First task',
    completed: false,
    owner: userOne._id
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'My Second task',
    completed: true,
    owner: userOne._id
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'My Third task',
    completed: true,
    owner: userTwo._id
};

const setupDatabase = async () => {
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

const dropDatabase = async  () => {
    await User.deleteMany();
    await Task.deleteMany();
};

module.exports = {
    userOneId,
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    dropDatabase,
    setupDatabase
};