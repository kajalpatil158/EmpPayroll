const chai = require('chai');
const server = require('../server');
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
let data = fs.readFileSync('test/empdata.json');
let emptest = JSON.parse(data);

describe('POST/login', () => {
    it('Post Registration', (done) => {
        const Registration = {
            "emailId": "rutu@gmail.com",
            "password": "jklaa12"
        };
        chai.request(server)
            .post('/login')
            .send(Registration)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.property('success').eq(true);
                res.body.should.be.property('message').eq("User Login Successfull!!");
                res.body.should.be.property('token');
                done();
            });
    });
});