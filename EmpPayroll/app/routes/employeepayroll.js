const employeePayroll = require('../controllers/employeepayroll.js');

module.exports = (app) => {

    // Create a new employeespayroll
    app.post('/empPayroll', employeePayroll.create);

    // Retrieve all employeespayroll
    app.get('/empPayroll', employeePayroll.findAll);

    /*// Retrieve a single employeespayroll with employeepayroll
    app.get('/empPayroll/:employeepayrollId', EmployeePayroll.findOne);

    // Update a employeespayroll with employeepayroll
    app.put('/empPayroll/:employeepayrollId', EmployeePayroll.update);

    // Delete a employeespayroll with employeepayroll
    app.delete('/empPayroll/:employeepayrollId', EmployeePayroll.delete);*/
}