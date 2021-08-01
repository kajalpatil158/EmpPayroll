const joi = require("@hapi/joi");

class validateFields {

    userData = joi.object({
        firstName: joi.string().alphanum().max(30),
        lastName: joi.string().alphanum().max(30),
        emailId: joi.string().email().required(),
        password: joi.string().regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).required(),
    });

}
module.exports = new validateFields();