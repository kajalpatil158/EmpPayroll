const mongoose = require('mongoose');

/* @Description- Created A Database Connection Function
 * Passing Url And Establish connection.
 * return mongoose connection
 */
function dbconnection() {

    mongoose.promise;
    const url = 'mongodb://localhost:27017/employeepayroll';
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    return mongoose.connection
        .then(() => {
            console.log("Successfully connected to the database");
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            process.exit();
        });
}
module.exports = dbconnection;