const express = require('express');

// create express app
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

require('dotenv').config();

//Connect to DB
const dbconnection = require('./config/dbconfig.js');
const logger = require('./config/logger');
dbconnection();

// parse requests 
app.use(express.urlencoded({ extended: true }))

// parse requests 
app.use(express.json())

// define a simple route
app.get('/', (req, res) => {
    res.json(`Well Come In Employee Payroll Application!!!!`);
});

//To Dispaly swgger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Require Employee routes
require('./app/routes/employeepayroll.js')(app);

// listen for requests
const port = 7000
app.listen(7000, () => {
    console.log('Application Is Listening On Port 7000');
});