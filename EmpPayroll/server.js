const express = require('express');
// create express app
const app = express();

//Connect to DB
//const dbconnection = require('./config/database.config.js');
//dbconnection();

// parse requests 
app.use(express.urlencoded({ extended: true }))

// parse requests 
app.use(express.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome In EmployeePlayRoll Application " });
});

// Require Employee routes
//require('./app/routes/employeepayroll.routes.js')(app);

// listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000 ");
});