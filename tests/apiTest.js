require("dotenv").config({ silent: true });
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

//const expect = chai.expect;
chai.should();

const mongoose = require('mongoose');

//const server = require("../app");
const host = process.env.HOST || "http://localhost:3000";

describe("API Calls", () => {
    after(function(done){
        mongoose.connection.close(done);
    });
  //const folder = "6267a6ad19b28e3b91fbcf2b";
  const noteid = "6267a6bb19b28e3b91fbcf2f";
  const fail = "failed_not_even_id";
  describe("GET /api/${noteid}", () => {
    it("should return a 200 HTTP response code when given valid ID", done => {
      chai
        .request(host)
        .get(`/api/${noteid}`)
        .type("form")
        .send({})
        .end((err, res) => {
            //console.log(res.status);
            res.should.have.status(200);
          done();
        });
    });
    it("should return a 401 HTTP response code when given invalid ID", done => {
        chai
          .request(host)
          .get(`/api/${fail}`)
          .type("form")
          .send({})
          .end((err, res) => {
              //console.log(res.status);
              res.should.have.status(401);
            done();
          });
      });
  });
  const item = "626747c85c8a1c5652306e18";
  const listid = "62673cc1db321e8877c58ced";
  describe("GET /api/delete/:itemID", () => {
    it("should return a 200 HTTP response code to delete valid item", done => {
      chai
        .request(host)
        .post(`/api/delete/${item}`)
        .type("form")
        .send({})
        .end((err, res) => {
            //console.log(res.status);
            res.should.have.status(200);
          done();
        });
    });
    it("should return a 200 HTTP response code for the same item, now invalid", done => {
        chai
            .request(host)
            .post(`/api/delete/${item}`)
            .type("form")
            .send({})
            .end((err, res) => {
                //console.log(res.status);
                res.should.have.status(200);
            done();
            });
    });
    it("should return a 200 HTTP response code for a listID", done => {
        chai
            .request(host)
            .post(`/api/delete/${listid}`)
            .type("form")
            .send({})
            .end((err, res) => {
                //console.log(res.status);
                res.should.have.status(200);
            done();
            });
    });
  });

});