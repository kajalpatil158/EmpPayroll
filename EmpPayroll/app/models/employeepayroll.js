const mongoose = require('mongoose');
//Created Employee Schema 
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

    /* @Description - Create method Created To Save Data
     * @param empData is data sent from Service
     * @return callback is used to callback Services includes error message or data
     */
    create = (empData, callBack) => {
            const employee = new empPayrollModel({
                firstName: empData.firstName,
                lastName: empData.lastName,
                email: empData.email,
                password: empData.password
            });
            employee.save((error, data) => {
                if (error) {
                    return callBack(error, null);
                }
                return callBack(null, data);
            });
        }
        /* @Description - FindAll method Created To Find A Employee Payroll Data.
         * @param  data sent from Service
         * @return callback is used to callback Services includes error message or data
         */
    findAll = (callBack) => {
            empPayrollModel.find((error, data) => {
                if (error) {
                    return callBack(error, null);
                }
                return callBack(null, data);
            });
        }
        /* @Description - FindById method Created To Finding Data By Id.
         * @param  data sent from Service
         * @return callback is used to callback Services includes error message or data
         */
    findById = (empId, callback) => {
            empPayrollModel.findById(empId, (error, data) => {
                if (error) {
                    return callback(error, null);
                }
                return callback(null, data)
            })
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
                if (error) {
                    return callback(error, null);
                }
                return callback(null, data);
            });
    }

}

module.exports = new empModel();