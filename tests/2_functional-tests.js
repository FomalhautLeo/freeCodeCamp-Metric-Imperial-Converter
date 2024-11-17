const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  test("Convert a valid input", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        const body = res.body;
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.strictEqual(body.initNum, 10);
        assert.strictEqual(body.initUnit, "L");
        assert.strictEqual(body.returnNum, 2.64172);
        assert.strictEqual(body.returnUnit, "gal");
        assert.strictEqual(body.string, "10 liters converts to 2.64172 gallons");
        done();
      });
  });
  test("Convert an invalid input", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        const body = res.body;
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.strictEqual(body.error, "invalid unit");
        done();
      });
  });
  test("Convert an invalid number", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        const body = res.body;
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.strictEqual(body.error, "invalid number");
        done();
      });
  });
  test("Convert an invalid number and unit", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kilomegaram")
      .end(function (err, res) {
        const body = res.body;
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.strictEqual(body.error, "invalid number and unit");
        done();
      });
  });
  test("Convert with no number", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        const body = res.body;
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.strictEqual(body.initNum, 1);
        assert.strictEqual(body.initUnit, "kg");
        assert.strictEqual(body.returnNum, 2.20462);
        assert.strictEqual(body.returnUnit, "lbs");
        assert.strictEqual(body.string, "1 kilograms converts to 2.20462 pounds");
        done();
      });
  });
});
