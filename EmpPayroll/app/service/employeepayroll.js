const EmpModel = require('../models/employeepayroll');
const logger = require('../../config/logger');

class EmpService {

    /* @Description - create method is created.
     * @param- empData send from controller
     * @return callback is used to callback controller
     */
    create = (empData, callBack) => {
        EmpModel.create(empData, (error, data) => {
            if(error){
                logger.error("Employee payroll Create service -",error);
                return callBack(error, null);  
            }
                logger.info("Employee payroll Create service -",data);
                return callBack(null, data);
            //return (error) ? callBack(error, null) : callBack(null, data);
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
updateByID = (empId, newData, callBack) => {
    EmpModel.updateById(empId, newData, (error, data) => {
        console.log(data);
        return (error) ? callBack(error, null) : callBack(null, data);
    })
}

/* @Description - Delete method is created.
 * @param- empData send from controller
 * @return callback is used to callback controller
 */
deleteById = (empId, callBack) => {
    EmpModel.deleteById(empId, (error, data) => {
        return (error) ? callBack(error, null) : callBack(null, data);
    });
 }
}
module.exports = new EmpService();
