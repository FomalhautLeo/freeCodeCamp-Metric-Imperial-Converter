const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();
const delta = 1e-5;

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input", function () {
    assert.strictEqual(
      convertHandler.getNum("12mi"),
      12,
      "convertHandler should correctly read a whole number input"
    );
  });
  test("convertHandler should correctly read a decimal number input", function () {
    assert.strictEqual(
      convertHandler.getNum("12.4mi"),
      12.4,
      "convertHandler should correctly read a decimal number input"
    );
  });
  test("convertHandler should correctly read a fractional input", function () {
    assert.approximately(
      convertHandler.getNum("2/3mi"),
      2 / 3,
      delta,
      "convertHandler should correctly read a fractional input"
    );
  });
  test("convertHandler should correctly read a fractional input with a decimal", function () {
    assert.strictEqual(
      convertHandler.getNum("5.4/2mi"),
      2.7,
      "convertHandler should correctly read a fractional input with a decimal"
    );
  });
  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function () {
    assert.throws(() => convertHandler.getNum("3/2/3mi"), "invalid number");
  });
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function () {
    assert.strictEqual(
      convertHandler.getNum("mi"),
      1,
      "convertHandler should correctly default to a numerical input of 1 when no numerical input is provided"
    );
  });
  test("convertHandler should correctly read each valid input unit", function () {
    assert.strictEqual(
      convertHandler.getUnit("2mi"),
      "mi",
      "convertHandler should correctly read each valid input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("2km"),
      "km",
      "convertHandler should correctly read each valid input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("2kg"),
      "kg",
      "convertHandler should correctly read each valid input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("2lbs"),
      "lbs",
      "convertHandler should correctly read each valid input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("2gal"),
      "gal",
      "convertHandler should correctly read each valid input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("2l"),
      "L",
      "convertHandler should correctly read each valid input unit"
    );
  });
  test("convertHandler should correctly return an error for an invalid input unit", function () {
    assert.throws(() => convertHandler.getUnit("3k"), "invalid unit");
  });
  test("convertHandler should return the correct return unit for each valid input unit", function () {
    assert.strictEqual(
      convertHandler.getReturnUnit("mi"),
      "km",
      "convertHandler should return the correct return unit for each valid input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("km"),
      "mi",
      "convertHandler should return the correct return unit for each valid input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("kg"),
      "lbs",
      "convertHandler should return the correct return unit for each valid input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("lbs"),
      "kg",
      "convertHandler should return the correct return unit for each valid input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("gal"),
      "L",
      "convertHandler should return the correct return unit for each valid input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("L"),
      "gal",
      "convertHandler should return the correct return unit for each valid input unit"
    );
  });
  test("convertHandler should correctly return the spelled-out string unit for each valid input unit", function () {
    assert.strictEqual(
      convertHandler.spellOutUnit("mi"),
      "miles",
      "convertHandler should correctly return the spelled-out string unit for each valid input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("km"),
      "kilometers",
      "convertHandler should correctly return the spelled-out string unit for each valid input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("kg"),
      "kilograms",
      "convertHandler should correctly return the spelled-out string unit for each valid input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("lbs"),
      "pounds",
      "convertHandler should correctly return the spelled-out string unit for each valid input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("gal"),
      "gallons",
      "convertHandler should correctly return the spelled-out string unit for each valid input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("L"),
      "liters",
      "convertHandler should correctly return the spelled-out string unit for each valid input unit"
    );
  });
  test("convertHandler should correctly convert gal to L", function () {
    assert.strictEqual(
      convertHandler.convert(1, "gal"),
      3.78541,
      "convertHandler should correctly convert gal to L"
    );
  });
  test("convertHandler should correctly convert L to gal", function () {
    assert.strictEqual(
      convertHandler.convert(1, "L"),
      0.26417,
      "convertHandler should correctly convert L to gal"
    );
  });
  test("convertHandler should correctly convert mi to km", function () {
    assert.strictEqual(
      convertHandler.convert(1, "mi"),
      1.60934,
      "convertHandler should correctly convert mi to km"
    );
  });
  test("convertHandler should correctly convert km to mi", function () {
    assert.strictEqual(
      convertHandler.convert(1, "km"),
      0.62137,
      "convertHandler should correctly convert km to mi"
    );
  });
  test("convertHandler should correctly convert lbs to kg", function () {
    assert.strictEqual(
      convertHandler.convert(1, "lbs"),
      0.45359,
      "convertHandler should correctly convert lbs to kg"
    );
  });
  test("convertHandler should correctly convert kg to lbs", function () {
    assert.strictEqual(
      convertHandler.convert(1, "kg"),
      2.20462,
      "convertHandler should correctly convert kg to lbs"
    );
  });
});
