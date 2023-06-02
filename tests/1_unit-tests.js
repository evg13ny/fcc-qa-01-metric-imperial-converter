const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {

    suite('Function converHandler.getNum(input)', () => {
        test('Whole number input', (done) => {
            let input = '32L';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });

        test('Decimal Input', (done) => {
            let input = '3.2L';
            assert.equal(convertHandler.getNum(input), 3.2);
            done();
        });

        test('Fractional Input', (done) => {
            let input = '2/3L';
            assert.equal(convertHandler.getNum(input), 2 / 3);
            done();
        });

        test('Fractional Input w/Decimal', (done) => {
            let input = '3.2/3L';
            assert.equal(convertHandler.getNum(input), 3.2 / 3);
            done();
        });

        test('Invalid Input (double fraction)', (done) => {
            let input = '1/2/3L';
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });

        test('No numerical input', (done) => {
            let input = 'L';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });

    suite('Function converHandler.getUnit(input)', () => {
        test('For Each Valid Unit Inputs', (done) => {
            let input = [
                'gal',
                'l',
                'mi',
                'km',
                'kg',
                'GAL',
                'L',
                'MI',
                'KM',
                'KG'
            ];

            let output = [
                'gal',
                'L',
                'mi',
                'km',
                'kg',
                'gal',
                'L',
                'mi',
                'km',
                'kg'
            ];

            input.forEach((ele, i) => {
                assert.equal(convertHandler.getUnit(ele), output[i]);
            });

            done();
        });

        test('Unknown Unit Input', (done) => {
            let input = '32LL';
            assert.equal(convertHandler.getUnit(input), undefined);
            done();
        });
    });

    suite('Function converHandler.getReturnUnit(unit)', () => {
        test('For Each Valid Unit Inputs', (done) => {
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];

            input.forEach((ele, i) => {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
            });

            done();
        });
    });

    suite('Function converHandler.spellOutUnit(initUnit)', () => {
        test('For Each Valid Unit Inputs', (done) => {
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

            let expect = [
                'gallons',
                'litres',
                'miles',
                'kilometers',
                'pounds',
                'kilograms'
            ];

            input.forEach((ele, i) => {
                assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
            });

            done();
        });
    });

    suite('Function converHandler.convert(num, unit)', () => {
        test('Gal to L', (done) => {
            let input = [5, 'gal'];
            let expected = 18.9271;

            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test('L to Gal', (done) => {
            let input = [5, 'l'];
            let expected = 1.32086;

            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test('Mi to Km', (done) => {
            let input = [5, 'MI'];
            let expected = 8.0467;

            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test('Km to Mi', (done) => {
            let input = [5, 'kM'];
            let expected = 3.10686;

            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test('Lbs to Kg', (done) => {
            let input = [5, 'Lbs'];
            let expected = 2.26796;

            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test('Kg to Lbs', (done) => {
            let input = [5, 'kg'];
            let expected = 11.02312;

            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });
    });
});