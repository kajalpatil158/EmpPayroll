const chai = require('chai');
const server = require('../server');
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

describe('POST/login', () => {
    it('It should POST new task', (done) => {
        const task = {
            "emailId": "rutu@gmail.com",
            "password": "jklaa12"
        };
        chai.request(server)
            .post('/login')
            .send(task)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.property('success').eq(true);
                res.body.should.be.property('message').eq("User Login Successfull!!");
                res.body.should.be.property('token');
                done();
            });
    });
});