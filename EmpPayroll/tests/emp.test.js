var expect = require('chai').expect;
var app = require('../server.js');
var request = require('supertest');

//let's set up the data we need to pass to the login method
const userCredentials = {
        "emailId": "rutu@gmail.com",
        "password": "jklaa12"
    }
    //now let's login the user before we run any tests
var authenticatedUser = request.agent(app);
before(function(done) {
    authenticatedUser
        .post('/login')
        .send(userCredentials)
        .end(function(err, response) {
            expect(response.statusCode).to.equal(200);
            expect('Location', '/home');
            done();
        });
});
//this test says: make a POST to the /login route with the email: sponge@bob.com, password: garyTheSnail
//after the POST has completed, make sure the status code is 200 
//also make sure that the user has been directed to the /home page