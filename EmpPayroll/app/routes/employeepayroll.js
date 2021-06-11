const employeePayroll = require('../controllers/employeepayroll.js');
const validation = require('../middleware/helper.js');
module.exports = (app) => {

    // Create a new employeespayroll
    app.post('/addEmployee', employeePayroll.create);

    // Retrieve all employeespayroll
    app.get('/empPayroll', validation.checkToken, employeePayroll.findAll);

    // Retrieve a single employeespayroll with employeepayroll
    app.get('/empPayroll/:empId', validation.checkToken, employeePayroll.findOne);

    // Update a employeespayroll with employeepayroll
    app.put('/update/:empId', validation.checkToken, employeePayroll.update);

    // Delete a employeespayroll with employeepayroll
    app.delete('/delete/:empId', validation.checkToken, employeePayroll.delete);

    // Login JWT Authentication
    app.post('/login', employeePayroll.login);

}