function ConvertHandler() {
  this.getNum = function (input) {
    const regex = /^(?:(\d+(?:\.\d+)?)(?:\/(\d+(?:\.\d+)?))?)?[A-Za-z]+$/;
    const match = input.match(regex);
    if (!match) throw new Error("invalid number");
    const lhs = Number(match[1]);
    if (!lhs) return 1;
    const rhs = Number(match[2]);
    if (rhs) return lhs / rhs;
    return lhs;
  };

  this.getUnit = function (input) {
    const regex = /([A-Za-z])+$/;
    const unit = input.match(regex)[0].toLowerCase();
    switch (unit) {
      case "gal":
      case "mi":
      case "km":
      case "lbs":
      case "kg":
        return unit;
      case "l":
        return "L";
      default:
        throw new Error("invalid unit");
    }
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return "";
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case "gal":
        return "gallons";
      case "L":
        return "liters";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return "";
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let ret = 0;
    switch (initUnit) {
      case "gal":
        ret = initNum * galToL;
        break;
      case "L":
        ret = initNum / galToL;
        break;
      case "mi":
        ret = initNum * miToKm;
        break;
      case "km":
        ret = initNum / miToKm;
        break;
      case "lbs":
        ret = initNum * lbsToKg;
        break;
      case "kg":
        ret = initNum / lbsToKg;
        break;
      default:
        break;
    }
    return Number(ret.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
