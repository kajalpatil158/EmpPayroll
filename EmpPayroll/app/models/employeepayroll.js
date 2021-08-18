const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//Created Employee Schema 
const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{2,20}/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{2,20}/
    },
    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
});

const empPayrollModel = mongoose.model('Employee', EmployeeSchema);
class empModel {
    /* @Description - Create method Created To Save Data.
     * @param empData is data sent from Service.
     * @return callback is used to callback Services includes error message or data
     */
    create = (empData, callBack) => {
        const employee = new empPayrollModel({
            firstName: empData.firstName,
            lastName: empData.lastName,
            email: empData.email,
            department: empData.department,
            salary: empData.salary,
        });
        employee.save((error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
        });
    }
    /* @Description - FindAll method Created To Find A Employee Payroll Data.
     * @param  data sent from Service
     * @return callback is used to callback Services includes error message or data
     */
    findAll = (callBack) => {
        empPayrollModel.find((error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
        });
    }
    /* @Description - FindById method Created To Finding Data By Id.
     * @param  data sent from Service
     * @return callback is used to callback Services includes error message or data
     */
    findById = (empId, callback) => {
        empPayrollModel.findById(empId, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }
    /* @Description - Update method Created To Updated A Data
     * @param data sent from Service
     * @return callback is used to callback Services includes error message or data
     */
    updateById = (newData, empId, callBack) => {
        empPayrollModel.findByIdAndUpdate(empId, {
            firstName: newData.firstName,
            lastName: newData.lastName,
            email: newData.email,
            department: newData.department,
            salary: newData.salary,
        }, { new: true },
            (error, data) => {
                if (error) {
                    return callBack(error, null);
                } else {
                    return callBack(null, data);
                }
            });
    }
    /* @Description - Update method Created To Updated A Data
     * @param data sent from Service
     * @return callback is used to callback Services includes error message or data
     */
    deleteById = (empId, callBack) => {
        empPayrollModel.findByIdAndRemove(empId, (error, data) => {
            if (error) {
                return callBack(error, null);
            } else {
                return callBack(null, data);
            }
        })
    }
}
module.exports = new empModel();