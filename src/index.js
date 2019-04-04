const app = require('./app.js');

//Connecting the Server
const port =process.env.PORT;
app.listen(port, ()=> {
    console.log('Server is up on port ' + port);
});