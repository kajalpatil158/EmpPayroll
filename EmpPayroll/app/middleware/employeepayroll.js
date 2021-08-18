const Joi = require('joi');

const empData = Joi.object({
    firstName: Joi.string().min(2).max(15).pattern(new RegExp('^[a-zA-Z]{2,}')).required(),
    lastName: Joi.string().min(2).max(15).pattern(new RegExp('^[a-zA-Z]{2,}')).required(),
    email: Joi.string().email().pattern(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")).required(),
    department: Joi.string().required(),
    salary: Joi.string().required(),
})
module.exports = empData;