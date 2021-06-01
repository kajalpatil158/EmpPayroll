const express = require('express');
// create express app
const app = express();

require('dotenv').config();

//const PORT = process.env.PORT || 7000;

//Connect to DB
const dbconnection = require('./config/dbconfig.js');
dbconnection();

// parse requests 
app.use(express.urlencoded({ extended: true }))

// parse requests 
app.use(express.json())

// define a simple route
app.get('/', (req, res) => {
    res.json(`Well Come In Employee Payroll Application!!!!`);
});

// Require Employee routes
require('./app/routes/employeepayroll.js')(app);

// listen for requests
const port = 7000
app.listen(port, () => {
    console.log('Application Is Listening On Port ', +port);
});