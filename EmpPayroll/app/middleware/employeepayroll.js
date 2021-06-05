const joi = require("@hapi/joi");

const employeeSchema = {
    employee: joi.object({
        firstName: joi.string().max(25).required(),
        lastName: joi.string().max(25).required(),
        emailId: joi.string().email().required(),
        password: joi.string().regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).required(),

    })
};

module.exports = employeeSchema;