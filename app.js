const mongoose = require('mongoose'),
      express  = require('express');
      app       = express();


//Parse incoming data to json
app.use(express.json());

// Requiring routes
var usersRoutes = require("./routes/users"),
    tasksRoutes = require("./routes/tasks");

// Conecting to the database
var url = process.env.DATABASEURL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});


app.use("/users", usersRoutes);
app.use("/tasks", tasksRoutes);

//Connecting the Server
const port =process.env.PORT;
app.listen(port, ()=> {
    console.log('Server is up on port ' + port);
});