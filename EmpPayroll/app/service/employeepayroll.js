const EmpModel = require('../models/employeepayroll');

class EmpService {

    /* @Description - create method is created.
     * @param- empData send from controller
     * @return callback is used to callback controller
     */
    create = (empData, callBack) => {
        EmpModel.create(empData, (error, data) => {
            if (error) {
                return callBack(errror.null);
            }
            return callBack(null, data);
        })
    }

    /* @Description - finAll method is created.
     * @param- empData send from controller
     * @return callback is used to callback controller
     */
    findAll = (callback) => {
            EmpModel.findAll((error, data) => {
                if (error) {
                    return callback(error, null);
                }
                return callback(null, data);
            });
        }
        /* @Description - findById method is created.
         * @param- empData send from controller
         * @return callback is used to callback controller
         */
    findById = (empId, callback) => {
            EmpModel.findById(empId, (error, data) => {
                if (error) {
                    return callback(error, null);
                }
                return callback(null, data);
            });
        }
        /* @Description - updateById method is created.
         * @param- empData send from controller
         * @return callback is used to callback controller
         */
    updateByID = (empId, newData, callback) => {
        EmpModel.updateById(empId, newData, (error, data) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, data);
        })
    }
}
module.exports = new EmpService();