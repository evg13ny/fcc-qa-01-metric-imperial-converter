const numberUnitSplitter = (input) => {
  let number = input.match(/[\d\.\/]+/g) || ['1'];
  let unit = input.match(/[a-z]+/gi)[0];

  return [number[0], unit];
}

const checkDiv = (possibleFraction) => {
  let nums = possibleFraction.split('/');

  if (nums.length > 2) return false;

  return nums;
}

class ConvertHandler {
  constructor() {

    this.getNum = (input) => {
      let result = numberUnitSplitter(input)[0];
      let nums = checkDiv(result);

      if (!nums) {
        return undefined;
      }

      let num1 = nums[0];
      let num2 = nums[1] || '1';

      result = num1 / num2;

      if (isNaN(num1) || isNaN(num2))
        return undefined;

      return result;
    };

    this.getUnit = (input) => {
      let result = numberUnitSplitter(input)[1].toLowerCase();

      switch (result) {
        case 'km':
          return 'km';
        case 'gal':
          return 'gal';
        case 'lbs':
          return 'lbs';
        case 'mi':
          return 'mi';
        case 'l':
          return 'L';
        case 'kg':
          return 'kg';
        default:
          return undefined;
      }
    };

    this.getReturnUnit = (initUnit) => {
      let result = initUnit.toLowerCase();

      switch (result) {
        case 'km':
          return 'mi';
        case 'gal':
          return 'L';
        case 'lbs':
          return 'kg';
        case 'mi':
          return 'km';
        case 'l':
          return 'gal';
        case 'kg':
          return 'lbs';
        default:
          return undefined;
      }
    };

    this.spellOutUnit = (unit) => {
      let result = unit.toLowerCase();

      switch (result) {
        case 'km':
          return 'kilometers';
        case 'gal':
          return 'gallons';
        case 'lbs':
          return 'pounds';
        case 'mi':
          return 'miles';
        case 'l':
          return 'litres';
        case 'kg':
          return 'kilograms';
        default:
          return undefined;
      }
    };

    this.convert = (initNum, initUnit) => {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;

      let result;

      switch (initUnit.toLowerCase()) {
        case 'km':
          result = initNum / miToKm;
          break;
        case 'gal':
          result = initNum * galToL;
          break;
        case 'lbs':
          result = initNum * lbsToKg;
          break;;
        case 'mi':
          result = initNum * miToKm;
          break;
        case 'l':
          result = initNum / galToL;
          break;
        case 'kg':
          result = initNum / lbsToKg;
          break;;
        default:
          result = undefined;
          break;
      }

      return parseFloat(result.toFixed(5));
    };

    this.getString = (initNum, initUnit, returnNum, returnUnit) => {
      return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    };
  }
}

module.exports = ConvertHandler;