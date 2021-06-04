const employeePayroll = require('../controllers/employeepayroll.js');
const validation = require('../middleware/jwtvalidation.js');
module.exports = (app) => {

    // Create a new employeespayroll
    app.post('/empPayroll', validation.checkToken, employeePayroll.create);

    // Retrieve all employeespayroll
    app.get('/empPayroll', validation.checkToken, employeePayroll.findAll);

    // Retrieve a single employeespayroll with employeepayroll
    app.get('/empPayroll/:empId', validation.checkToken, employeePayroll.findOne);

    // Update a employeespayroll with employeepayroll
    app.put('/empPayroll/:empId', validation.checkToken, employeePayroll.update);

    // Delete a employeespayroll with employeepayroll
    app.delete('/empPayroll/:empId', validation.checkToken, employeePayroll.delete);

    // Login JWT Authentication
    app.post('/login', employeePayroll.login);
}