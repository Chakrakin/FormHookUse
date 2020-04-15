import {overwriteValidationRule} from './ValidationRules';

describe('Validation Rules', () => {
  it('should override validation rules with custom rules', () => {
    const validation = {minLength : {value: 2}};
    const newRules = {minLength: {test: 'test'}};
    const outcome = overwriteValidationRule(validation, newRules);
    expect(outcome.minLength.test).toBe(newRules.minLength.test);
  });
});
