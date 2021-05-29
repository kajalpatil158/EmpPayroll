const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[A-Z]{1}[a-z]{2,}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[A-Z]{1}[a-z]{2,}$/
    },
    emailId: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password: {
        type: String,
        required: true
    },
}, {
    // generates the time stamp with boolean true value
    timestamps: true
});

EmployeeSchema.pre('save', function(next) {
    var employee = this;
    // only hash the password if it has been modified (or is new)
    if (!employee.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(employee.password, salt, function(error, hash) {
            if (error) return next(error);
            // override the cleartext password with the hashed one
            employee.password = hash;
            next();
        });
    });
});

EmployeeSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('Employee', EmployeeSchema);