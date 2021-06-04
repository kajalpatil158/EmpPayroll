const employeePayroll = require('../controllers/employeepayroll.js');

module.exports = (app) => {

    // Create a new employeespayroll
    app.post('/empPayroll', employeePayroll.create);

    // Retrieve all employeespayroll
    app.get('/empPayroll', employeePayroll.findAll);

    // Retrieve a single employeespayroll with employeepayroll
    app.get('/empPayroll/:empId', employeePayroll.findOne);

    // Update a employeespayroll with employeepayroll
    app.put('/empPayroll/:empId', employeePayroll.update);

    // Delete a employeespayroll with employeepayroll
    app.delete('/empPayroll/:empId', employeePayroll.delete);

    app.post('/login', employeePayroll.login);
}