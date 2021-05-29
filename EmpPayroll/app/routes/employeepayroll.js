module.exports = (app) => {
    const employeePayroll = require('../controllers/employeepayroll.js');

    // Create a new employeespayroll
    app.post('/empPayroll', employeePayroll.create);

    // Retrieve all employeespayroll
    app.get('/empPayroll', employeePayroll.findAll);

    // Retrieve a single employeespayroll with employeepayroll
    app.get('/empPayroll/:employeepayrollId', employeePayroll.findOne);

    // Update a employeespayroll with employeepayroll
    app.put('/empPayroll/:employeepayrollId', employeePayroll.update);

    // Delete a employeespayroll with employeepayroll
    app.delete('/empPayroll/:employeepayrollId', employeePayroll.delete);
}