const EmployeePayroll = require('../models/employeepayroll.js');

// Create and Save a employee data
exports.create = (req, res) => {
    var abc = 0;
    if (!req.body.firstName) {
        abc = 1;
    }
    if (!req.body.lastName) {
        abc = 1;
    }
    if (!req.body.emailId) {
        abc = 1;
    }
    if (!req.body.password) { abc = 1; }
    if (abc == 1) {
        return res.status(400).send({
            message: "Your are missing some data!!"
        });
    }

    //create an object 
    const employeepayroll = new EmployeePayroll({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password
    });

    employeepayroll.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the employee payroll."
            });
        });
};

// Retrieve and return all employee payroll from the database.
exports.findAll = (req, res) => {
    EmployeePayroll.find()
        .then(employeespayroll => {
            res.send(employeespayroll);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving employee payroll data."
            });
        });
};

// Find a single employee payroll by employeepayrollId
exports.findOne = (req, res) => {
    EmployeePayroll.findById(req.params.employeepayrollId)
        .then(employeepayroll => {
            if (!employeepayroll) {
                return res.status(404).send({
                    message: " Employee payroll id not found " + req.params.employeepayrollId
                });
            }
            res.send(employeepayroll);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Employee payroll id not found " + req.params.employeepayrollId
                });
            }
            return res.status(500).send({
                message: "Employee payroll id not found " + req.params.employeepayrollId
            });
        });
};

// Update a employee payroll identified by the employeepayrollId in the request
exports.update = (req, res) => {
    // Validate Request
    var abc = 0;
    if (!req.body.firstName) {
        abc = 1;
    }
    if (!req.body.lastName) {
        abc = 1;
    }
    if (!req.body.emailId) {
        abc = 1;
    }
    if (!req.body.password) { abc = 1; }
    if (abc == 1) {
        return res.status(400).send({
            message: "Your are missing some data!!"
        });
    }

    // Find note and update it with the request body
    EmployeePayroll.findByIdAndUpdate(req.params.employeepayrollId, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: req.body.password
        }, { new: true })
        .then(employeepayroll => {
            if (!employeepayroll) {
                return res.status(404).send({
                    message: "Employee payroll id not found " + req.params.employeepayrollId
                });
            }
            res.send(employeepayroll);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Employee payroll id not found " + req.params.employeepayrollId
                });
            }
            return res.status(500).send({
                message: "Employee payroll id not found " + req.params.employeepayrollId
            });
        });
};

// Delete a employee payroll with the specified employeepayrollId in the request
exports.delete = (req, res) => {
    EmployeePayroll.findByIdAndRemove(req.params.employeepayrollId)
        .then(employeepayroll => {
            if (!employeepayroll) {
                return res.status(404).send({
                    message: "Employee payroll id not found " + req.params.employeepayrollId
                });
            }
            res.send({ message: "employeepayroll data deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Employee payroll id not found " + req.params.employeepayrollId
                });
            }
            return res.status(500).send({
                message: "Could not delete employee payroll data with id " + req.params.employeepayrollId
            });
        });
};