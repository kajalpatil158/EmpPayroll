const chai = require('chai');
const server = require('../server');
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
let data = fs.readFileSync('test/empdata.json');
let emptest = JSON.parse(data);

var assert = require('assert');

describe('POST/login', () => {
    it('Post To New Login Emp Data', (done) => {
        const empData = emptest.data1;
        chai.request(server)
            .post('/login')
            .send(empData)
            .end((error, res) => {
                res.should.have.status(200);
                //assert.property(res.body, 'success'); 
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

describe('POST/empPayroll', () => {
    it('Post emp data', (done) => {
        const empData = emptest.data3;
        chai.request(server)
            .post('/empPayroll')
            .send(empData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.property('success').eq(true);
                res.body.should.be.property('message').eq("Employee Payroll Is Added");
                done();
            });
    });

    it('It should POST a  employee data', (done) => {
        const empData = emptest.data4;
        chai.request(server)
            .post('/empPayroll')
            .send(empData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.property('success').eq(false);
                res.body.should.be.property('message')
                done();
            });
    });

    let token = '';
    console.log(token);
    beforeEach(done => {
        chai
            .request(server)
            .post("/login")
            .send(emptest.data1)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    });

    describe("/GET /findAll", () => {
        it("Retrive Employee Data With Valid Token ", done => {
            console.log(token);
            chai
                .request(server)
                .get("/empPayroll")
                .set('Authorization', 'bearar ' + token)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('message').eq("Getted all employees data!")
                    response.body.should.have.property('data')
                    done();
                });
        });

        it("Data Is Not Provide To Invalid Token", done => {
            chai
                .request(server)
                .get("/empPayroll")
                .set('Authorization', 'bearar ' + token.slice)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('success').eq(false);
                    res.body.should.have.property('message');
                    done();
                });
        });
    });

    describe("/GET /findOne", () => {
        it("find Employee Using Id with valid token", done => {
            chai
                .request(server)
                .get("/empPayroll/" + emptest.data5.Id)
                .set('Authorization', 'bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('data');
                    done();
                });
        });
        it("find Employee Using Id with valid token if not gives error ", done => {
            chai
                .request(server)
                .get("/empPayroll/" + emptest.data6.Id)
                .set('Authorization', 'bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('success').eq(false);
                    res.body.should.have.property('message');
                    done();
                });
        });
    });
    /* describe("/PUT /update", () => {
         it(" Update a Data Using Id ", done => {
             const newData = emptest.data3;
             chai
                 .request(server)
                 .put("/empPayroll/" + emptest.data5.Id)
                 .set('Authorization', 'bearar ' + token)
                 .send(newData)
                 .end((error, res) => {
                     res.should.have.status(200);
                     res.body.should.have.property('success').eq(true);
                     done();
                 });
         });
     });*/
    /* describe("/delele/Id", () => {
         it("Delete a Data Using Id", done => {
             chai
                 .request(server)
                 .delete("/empPayroll/" + emptest.data5.Id)
                 .set('Authorization', 'bearar ' + token)
                 .end((error, res) => {
                     res.should.have.status(200);
                     res.body.should.have.property('success').eq(true);
                     done();
                 });
         });
     });*/
});