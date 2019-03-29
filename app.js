const mongoose = require('mongoose'),
      User     = require("./models/user");

mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});


const me = new User( {
   name: 'Pablo Costanzo',
   email: 'costanzopa@gmail.com',
   age: '30'
});


User.create(me).then(() => {
  console.log(me)
}).catch((error) => {
  console.log('Error', error);
});