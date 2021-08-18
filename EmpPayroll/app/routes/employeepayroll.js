const employeePayroll = require('../controllers/employeepayroll');
const UserData = require('../controllers/userData.js')
const validation = require('../middleware/helper');

module.exports = (app) => {
    // Create a new employeespayroll
    app.post('/addEmployee',  employeePayroll.create);

    // Retrieve all employeespayroll
    app.get('/employees',  employeePayroll.findAll);

    // Retrieve a single employeespayroll with employeepayroll
    app.get('/employees/:empId', validation.checkToken, employeePayroll.findOne);

    // Update a employeespayroll with employeepayroll
    app.put('/update/:empId', employeePayroll.update);

    // Delete a employeespayroll with employeepayroll
    app.delete('/delete/:empId', employeePayroll.delete);

    // Created And Added User
    app.post('/register', UserData.userRegistrationDetails);

    // Login User
    app.post('/login', UserData.loginUser);
}