const UserModel = require('../models/userData.js');
const { genSaltSync, hashSync } = require("bcrypt");
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
require("dotenv").config();

class UserService {
    /* @Description - create method is created.
     * @param- user data send from controller
     * @return callback is used to callback controller
     */
    create = (userData, callBack) => {
            const salt = genSaltSync(10);
            userData.password = hashSync(userData.password, salt);
            UserModel.create(userData, (error, data) => {
                return (error) ? callBack(error, null) : callBack(null, data);
            });
        }
        /* @Description - getUserByEmail method is created for login a user using password and email.
         * @param- user data send from controller
         * @return callback is used to callback controller
         */
    getUserByEmail = (credentials) => {
        return new Promise((resolve, reject) => {
            UserModel.getUserByEmail(credentials, (error, data) => {
                if (error) {
                    reject(error) // calling `reject` will cause the promise to fail with or without the error passed as an argument
                    return;
                }
                // encrypt credentials.password
                // compare encrypted with data.password
                let result = bcrypt.compareSync(credentials.password, data.password);
                if (result) {
                    const jsontoken = sign({ result: data }, process.env.JWT_KEY, { expiresIn: "1h" });
                    console.log(jsontoken);
                    resolve(jsontoken)
                    return;
                }
                return reject("Invalid Email");
            });
        })
    }
}

module.exports = new UserService();