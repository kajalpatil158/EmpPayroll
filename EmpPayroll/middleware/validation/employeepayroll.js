const joi = reqire("@hapi/joi");

const employeeSchema = {
    employee: joi.object({
        firstName: joi.string().max(25).required(),
        lastName: joi.string().max(25).required(),
        email: joi.email().required(),
        password: joi.string().pattern(new RegExp('^[A-Za-z0-9]") { 5, 25 }$'))
    })
};

module.exports = employeeSchema;