const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//Created Employee Schema 
const EmployeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: String,
    password: String
}, {
    //versionKey to false since it’s useless for the purpose of the App
    versionKey: false,
    timestamps: true
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
                emailId: empData.emailId,
                password: empData.password
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
                return (error) ? callBack(error, null) : callBack(null, data);
            });
        }
        /* @Description - Update method Created To Updated A Data
         * @param data sent from Service
         * @return callback is used to callback Services includes error message or data
         */
    updateById = (empId, newData, callback) => {
            empPayrollModel.findByIdAndUpdate(empId, {
                    firstName: newData.firstName,
                    lastName: newData.lastName,
                    email: newData.email,
                    password: newData.password
                }, { new: true },
                (error, data) => {
                    return (error) ? callBack(error, null) : callBack(null, data);
                });
        }
        /* @Description - Update method Created To Updated A Data
         * @param data sent from Service
         * @return callback is used to callback Services includes error message or data
         */
    deleteById = (empID, callback) => {
        empPayrollModel.findByIdAndRemove(empID, error => {
            return (error) ? callBack(error, null) : callBack(null, data);
        })
    }

    getUserByEmail = (email, callback) => {
        empPayrollModel.findOne({ "emailId": email.emailId }, (error, data) => {
            console.log(email.emailId);
            if (error) {
                return callback(error, null)
            }
            return (!data) ? callback("User Not Exist ", null) : callback(null, data);
        })
    }
}
module.exports = new empModel();