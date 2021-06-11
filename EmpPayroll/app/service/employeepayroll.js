const EmpModel = require('../models/employeepayroll');
const { genSaltSync, hashSync } = require("bcrypt");
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
class EmpService {

    /* @Description - create method is created.
     * @param- empData send from controller
     * @return callback is used to callback controller
     */
    create = (empData, callBack) => {
        const salt = genSaltSync(10);
        console.log(empData.password);
        empData.password = hashSync(empData.password, salt);
        console.log(empData.password);
        EmpModel.create(empData, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
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

    getUserByEmail = (email, callback) => {
        EmpModel.getUserByEmail(email, (error, data) => {
            let result = null;
            if (error) {
                return callback(error, null);
            } 
            else if (result = bcrypt.compareSync(email.password, data.password)) {
                //data.password = undefined;
                const jsontoken = sign({ result: data }, "abc123", { expiresIn: "5h" });
                return callback(null, jsontoken); 
                
            }
            console.log(email.password);
            console.log(data.password);
            console.log(result);
            return callback("Invalid Email", null);
        });
    }
}
module.exports = new EmpService()