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
        empPayrollModel.find((error, data) => {
            if (error) {
                return callBack(error, null);
            }
            return callBack(null, data);
        });
    }

    findById = (empId, callback) => {
        empPayrollModel.findById(empId, (error, data) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, data)
        })
    }

    updateById = (empId, newData, callback) => {
        empPayrollModel.findByIdAndUpdate(EmpId, {
                firstName: newData.firstName,
                lastName: newData.lastName,
                email: newData.email,
                password: newData.password
            }, { new: true },
            (error, data) => {
                if (error) {
                    return callback(error, null);
                }
                return callback(null, data);
            });
    }

}

module.exports = new empModel();