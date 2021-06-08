const chai = require('chai');
const server = require('../server');
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
let data = fs.readFileSync('test/empdata.json');
let emptest = JSON.parse(data);

describe('POST/login', () => {
    it('Post To New Login Emp Data', (done) => {
        const empData = emptest.data1;
        chai.request(server)
            .post('/login')
            .send(empData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.property('success').eq(true);
                res.body.should.be.property('message').eq("User Login Successfull!!");
                res.body.should.be.property('token');
                done();
            });
    });

    it('Post data1 And Gives Error 404', (done) => {
        const empData = emptest.data2;
        chai.request(server)
            .post('/login')
            .send(empData)
            .end((error, res) => {
                res.should.have.status(404);
                res.body.should.be.property('success').eq(false);
                done();
            });
    });
});

describe('POST/add', () => {
    it('Post emp data', (done) => {
        const empData = emptest.data3;
        chai.request(server)
            .post('/empPayroll')
            .send(empData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.property('success').eq(true);
                res.body.should.be.property('message').eq("emp data added successfully!");
                done();
            });
    });
});