const joi = require("@hapi/joi");

const empData = joi.object({
    firstName: joi.string().max(25).required(),
    lastName: joi.string().max(25).required(),
    emailId: joi.string().email().required(),
    password: joi.string().regex(/^[a-zA-Z0-9!@#$%&*]{3,25}$/).required(),

})
module.exports = empData;