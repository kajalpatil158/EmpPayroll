const chai = require('chai');
const server = require('../server');
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
let data = fs.readFileSync('test/empdata.json');
let emptest = JSON.parse(data);

describe('POST/login', () => {
    it('givendatareturnbody_Whenlogin_Shouldreturnsuccess=truewith200statuscodeandsuccessfullloginmessage ', (done) => {
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

    it('givendatareturnbody_Whenlogin_Shouldreturnsuccess=falsewithstatus=404code ', (done) => {
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

describe('POST/create', () => {
    it('givenemployeeis_Whenadded_Shouldreturnstatus=200andsuccess=trueandmessage=SuccessfullyAdded', (done) => {
        const empData = emptest.data3;
        chai.request(server)
            .post('/create')
            .send(empData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.property('success').eq(true);
                res.body.should.be.property('message').eq("Employee Payroll Is Added");
                done();
            });
    });

    it('givenemployeeisnot_Whenadded_Shouldreturnstatus=404andsuccess=false', (done) => {
        const empData = emptest.data4;
        chai.request(server)
            .post('/create')
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
        it("giventoken_Whenvalid_Shouldretrivedatawithstatus=200andsuccess=truewithSuccessfullyretrivedatamessage", done => {
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

        it("giventoken_Wheninvalid_Shouldnotretrivedatawithstatus=404andsuccess=false", done => {
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

        it("giveninvalitoken_Whenretrived_Shouldreturnstatus401andsuccess=false", done => {
            var invalidToken = '';
            chai
                .request(server)
                .get("/empPayroll")
                .set('Authorization', invalidToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('success').eq(false);
                    res.body.should.have.property('message').eq("Access Denied!, Unauthorised User ");
                    done();
                });
        });
    });

    describe("/GET /findOne", () => {
        it("giventoken_Whenvalid_Shouldretriveadatabyiswithstatus=200andsuccess=truewithsuccessfullyretrivedatamessage", done => {
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
        it("giventoken_Wheninvalid_Shouldnotretrivedatawithstatus=404andsuccess=false", done => {
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
    describe("/put /update /Id", () => {
        it("givendatacheckwithtoken_Whentokenisvalid_Shouldreturnstatus=200andsuccess=true", done => {
            const newData = emptest.data3;
            chai
                .request(server)
                .put("/update/" + emptest.data5.Id)
                .set('Authorization', 'bearar ' + token)
                .send(newData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('message').eq("Data updated successfully");
                    done();
                });
        });
    });
    describe("/delele/Id", () => {
        it("givenvalidtoken_Whenthatpass_Shoulddeletedatastatus=200success=true", done => {
            console.log(emptest.data5.Id);
            chai
                .request(server)
                .delete("/delete/" + emptest.data5.Id)
                .set('Authorization', 'bearar ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('success').eq(true);
                    done();
                });
        });
        it("givenvalidtoken_Whenthatpass_Shoulddeletedatastatus=404success=false", done => {
            chai
                .request(server)
                .delete("/delete/" + emptest.data6.Id)
                .set('Authorization', 'bearar ' + token)
                .end((error, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('success').eq(false);
                    done();
                });
        });
    });
});