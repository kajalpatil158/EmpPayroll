const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Employee Payroll Schema',
        description: 'Employee Registration Data',
    },
    host: 'localhost:7000',
    schemes: ['http'],
};

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./app/routes/employeepayroll.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as server.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);