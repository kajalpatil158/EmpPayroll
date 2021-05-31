const EmpModel = require('../models/employeepayroll');

class EmpService {
    create = (empData, callBack) => {
        EmpModel.create(empData, (error, data) => {
            if (error) {
                return callBack(errror.null);
            }
            return callBack(null, data);
        })
    }

    findAll = (callback) => {
        EmpModel.findAll((error, data) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, data);
        });
    }

}
module.exports = new EmpService();