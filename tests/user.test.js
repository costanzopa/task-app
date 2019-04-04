const request = require('supertest');
const app     = require('../src/app');
const User    = require('../src/models/user');

const userOne = {
    name: "Jose Perez",
    email: "perezj@example.com",
    password: "123456789?"
};

beforeEach(async ()=> {
    await User.deleteMany();
    await new User(userOne).save();
});

test('Should signup a new user', async ()=> {
    await request(app).post("/users").send({
        name: "Pablo Costanzo",
        email: "costanzopa@example.com",
        password: "12345678"
    }).expect(201);
});


test('Should login an existing user', async ()=> {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});


test('Should not login nonexisting user', async ()=> {
    await request(app).post("/users").send({
        email: "costanzopa@example.com",
        password: "12345678"
    }).expect(400);
});