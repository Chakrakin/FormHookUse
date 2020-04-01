import {numberValidator} from './ValidationHandlers';

describe('validationHandler', () => {
  describe('valid inputs', () => {
    const numbersUnderTest = [1,333,1234,421];
    const numbersWithStringNumbersUnderTest = [1, 2, '3'];

    it('should return true on natural numbers', () => {
      const validatedNumbers = numbersUnderTest.map(numberValidator);
      expect(numberValidator(99999999999999999999)).toBeTruthy();
      expect(validatedNumbers.every(shouldBeTrue)).toBeTruthy();
    });

    it('should return true on number as string', () => {
      const validatedNumber = numbersWithStringNumbersUnderTest.map(numberValidator);
      expect(validatedNumber.every(shouldBeTrue)).toBeTruthy();
    });

    it('should not work for numbers greater then 20 digits but for strings', () => {
      // explanation: let a = 999999999999999999999 : results to 1e+21
      // whereas:     let b = 99999999999999999999  : results to 100000000000000000000
      expect(numberValidator(999999999999999999999)).toBeFalsy(); // >=20 digits
      expect(numberValidator('9999999999999999999999999999999')).toBeTruthy();
    });
  });
  describe('invalid inputs', () => {
    const numbersUnderTest = [1,333,1234,421, -1];
    const mixedValuesStringUnderTest = [1, 'test', 3333];
    const mixedValuesSpecialCharsUnderTest = [1, '!', 3333];
    const wrongValuesUnderTest = ['this', 'should', 'fail'];

    it('should return false on negative numbers', function () {
      const validatedNumbers = numbersUnderTest.map(numberValidator);
      expect(validatedNumbers.every(shouldBeTrue)).toBeFalsy();
    });

    it('should return false on letters or symbols', () => {
      const validatedMixedValuesString = mixedValuesStringUnderTest.map(numberValidator);
      const validatedMixedValuesSpecialChars = mixedValuesSpecialCharsUnderTest.map(numberValidator);
      const validatedWrongValues = wrongValuesUnderTest.map(numberValidator);
      expect(validatedMixedValuesString.every(shouldBeTrue)).toBeFalsy();
      expect(validatedMixedValuesSpecialChars.every(shouldBeTrue)).toBeFalsy();
      expect(validatedWrongValues.every(shouldBeTrue)).toBeFalsy();
      expect(countFalse(validatedWrongValues)).toBe(wrongValuesUnderTest.length);
    });
  })
});

const shouldBeTrue = e => e === true
const countFalse = list => list.filter(item => item === false).length
