const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: String,
    password: String
}, {
    timestamps: true
});

const empPayrollModel = mongoose.model('Employee', EmployeeSchema);
class empModel {
    create = (empData, callBack) => {
        const employee = new empPayrollModel({
            firstName: empData.firstName,
            lastName: empData.lastName,
            email: empData.email,
            password: empData.password
        });
        employee.save({}, (error, data) => {
            if (error) {
                return callBack(error, null);
            }
            return callBack(null, data);
        });
    }

    findAll = (callBack) => {
        empPayrollModel.find({}, (error, data) => {
            if (error) {
                return callBack(error, null);
            }
            return callBack(null, data);
        });
    }
}

module.exports = new empModel();