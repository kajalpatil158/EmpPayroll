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
    it('given data return body when login should return success=true with 200 status code and successfull login message ', (done) => {
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

    it('given data return body when login should return success=false with status=404 code ', (done) => {
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
    it('given employee is When added Should return status=200 and success=true and message = Successfully Added', (done) => {
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

    it('given employee is not When added Should return status=404 and success=false', (done) => {
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
        it("given token When valid Should retrive data with status=200 and success=true with Successfully retrive data message ", done => {
            console.log(token);
            chai
                .request(server)
                .get("/empPayroll")
                .set('Authorization', 'bearar ' + token)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('message').eq("Retrive all employees data!")
                    response.body.should.have.property('data')
                    done();
                });
        });

        it("given token When invalid Should not retrive data with status=404 and success=false ", done => {
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
        it("given token When valid Should retrive a data by is with status=200 and success=true with Successfully retrive data message", done => {
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
        it("given token When invalid Should not retrive data with status=404 and success=false ", done => {
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