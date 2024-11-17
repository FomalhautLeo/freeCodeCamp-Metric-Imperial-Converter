"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;
    console.log("Input: ", input);

    let initNum;
    let initUnit;
    const errors = [];
    try {
      initNum = convertHandler.getNum(input);
    } catch (error) {
      console.log("Get orror: ", error.message);
      errors.push(error);
    }
    try {
      initUnit = convertHandler.getUnit(input);
    } catch (error) {
      console.log("Get orror: ", error.message);
      errors.push(error);
    }
    if (errors.length > 0) {
      let errorMsg = "";
      if (errors.length == 2) {
        errorMsg = "invalid number and unit";
      } else {
        errorMsg = errors[0].message;
      }
      res.json({ error: errorMsg });
    } else {
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string,
      });
      console.log("send");
    }
  });
};
