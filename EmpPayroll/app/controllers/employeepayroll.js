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

        /* @Description- Check With Validation Emp error Is Erroe Occures Then Gives 400 HTTP Staus Code For 
        Print Client Side Erro And Provide Some Message With That.*/
        if (validationEmp.error) {
            return res.status(400).send({
                message: validationEmp.error.message
            });
        }

        //genSaltSync and hashSync Is Used For Encrypt A Data.
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);

        /* Created A Veriable And Check With A rmpInfo And Validation If Error Occures That Print This Error Message
        else Provide A Successfully Created Data.*/

        let empInfo = req.body;
        empService.create(empInfo, (error, validationEmp) => {
            if (error) {
                //logger.error("error occred while creating employee payroll");
                return res.status(500).send({
                    message: 'error occure while creating employee payroll'
                });
            }
            res.send({
                message: "Employee Payroll Is Added",
                data: validationEmp
            })
        })
    }

    // Retrieve and return all employee payroll from the database.
    findAll = (req, res) => {
        empService.findAll((error, empData) => {
            if (error) {
                logger.error("Error Occure While Retriving A Data")
                return res.status(500).send({
                    message: "Error Occure While Retriving A Data"
                });
            }
            res.send(empData)
        })
    };

    // Find a single employee payroll by employeepayrollId
    findOne = (req, res) => {
            empService.findById(req.params.empId, (error, empData) => {
                if (error) {
                    if (error.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Employee not found with id " + req.params.empId
                        });
                    }
                    return res.status(500).send({
                        message: "Error retrieving employee with id " + req.params.empId
                    });
                }
                if (empData)
                    res.send(empData);
                else {
                    return res.status(404).send({
                        message: "Employee not found with id " + req.params.employeeId
                    });
                }
            })
        }
        /*      // Find employee and update it with the request body
            /*    EmployeePayroll.findByIdAndUpdate(req.params.employeepayrollId, {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        emailId: req.body.emailId,
                        password: req.body.password
                    }, { new: true })
                    .then(employeepayroll => {
                        if (!employeepayroll) {
                            return res.status(404).send({
                                message: "Employee payroll id not found " + req.params.employeepayrollId
                            });
                        }
                        res.send(employeepayroll);
                    }).catch(err => {
                        if (err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: "Employee payroll id not found " + req.params.employeepayrollId
                            });
                        }
                        return res.status(500).send({
                            message: "Employee payroll id not found " + req.params.employeepayrollId
                        });
                    });
                };

                // Delete a employee payroll with the specified employeepayrollId in the request
                /*delete  (req, res)  {
                    EmployeePayroll.findByIdAndRemove(req.params.employeepayrollId)
                        .then(employeepayroll => {
                            if (!employeepayroll) {
                                return res.status(404).send({
                                    message: "Employee payroll id not found " + req.params.employeepayrollId
                                });
                            }
                            res.send({ message: "employeepayroll data deleted successfully!" });
                        }).catch(err => {
                            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                                return res.status(404).send({
                                    message: "Employee payroll id not found " + req.params.employeepayrollId
                                });
                            }
                            return res.status(500).send({
                                message: "Could not delete employee payroll data with id " + req.params.employeepayrollId
                            });
                        });
                };*/



}
module.exports = new EmployeePayroll();