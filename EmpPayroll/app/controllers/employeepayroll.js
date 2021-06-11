const empService = require('../service/employeepayroll');
const empPayroll = require('../models/employeepayroll.js');
const empData = require('../validation/employeepayroll.js');
const { genSaltSync, hashSync } = require("bcrypt");
/* @Description- create and save new emp
 * @param res is used to send responce.
 * @ method- create is use to cewate a employee Data.
 * For Encryption and Validation hashSync Is Used.
 */
class EmployeePayroll {
    create = (req, res) => {
        //Veriable Is Created validtion Emp To Validated Emp And Write A Data.
        var validationEmp = empData.validate(req.body);
        console.log(validationEmp);

        if (validationEmp.error) {
            return res.status(400).send({
                success: false,
                message: validationEmp.error.message
            });
        }

        //genSaltSync and hashSync Is Used For Encrypt A Data.
        //const salt = genSaltSync(10);
        //req.body.password = hashSync(req.body.password, salt);

        let empInfo = req.body;
        empService.create(empInfo, (error, validationEmp) => {
            if (error) {
                //logger.error("error occred while creating employee payroll");
                return res.status(500).send({
                    success: false,
                    message: 'error occure while creating employee payroll'
                });
            }
            res.send({
                success: true,
                message: "Employee Payroll Is Added",
                data: validationEmp
            })
        })
    }

    /* @Description - Find Employee Payroll Data Retrive All Emp Data
     * @param req Is Used To Send Http Request
     * @param res Is Used To Take A Http Responce.
     */
    findAll = (req, res) => {
        empService.findAll((error, empData) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: "some error is occurred!"
                })
            }
            res.send({
                success: true,
                message: "Getted all employees data!",
                data: empData
            })
        })
    };

    /* @Description - FindOne Employee Payroll Data Retrive Employee Data By Id
     * @param req Is Used To Send Http Request
     * @param res Is Used To Take A Http Responce.
     */
    findOne = (req, res) => {
            let empDataId = req.params.empId;
            empService.findById(empDataId, (error, empData) => {
                if (error) {
                    return res.status(404).send({
                        success: false,
                        message: "some error is occurred"
                    })
                }
                res.send({
                    success: true,
                    data: empData
                })
            })
        }
        /* @Description - Update Employee Payroll Data Update Emp Data By Id
         * @param req Is Used To Send Http Request
         * @param res Is Used To Take A Http Responce.
         */
    update = (req, res) => {
        let empId = req.params.empId;
        empService.updateByID(req.body, empId, (error, data) => {
            if (error) {
                logger.error("Some Error Occure While Updating Emp Data")
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Employee Not Finding With Given Id " + req.params.empId
                    });
                }
                res.send({
                    success: true,
                    message: "Data updated successfully",
                    data: data
                })

            }

        })
    };
    /* @Description - Delete Employee Payroll Data Update Emp Data By Id
     * @param req Is Used To Send Http Request
     * @param res Is Used To Take A Http Responce.
     */
    delete = (req, res) => {
        let empId = req.params.empId;
        empService.deleteById(empId, (error, empData) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: "Employee Id not found"

                })
            }
            res.send({
                success: true,
                data: empData
            })
        })
    };

    login = (req, res) => {
        let userInfo = req.body;
        empService.getUserByEmail(userInfo, (error, data) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: error
                });
            }
            res.send({
                success: true,
                message: "User Login Successfull!!",
                token: data
            });
        })
    }
}
module.exports = new EmployeePayroll();
