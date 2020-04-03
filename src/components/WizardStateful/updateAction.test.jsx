import {updateAction} from './updateAction';

describe('updateAction', () => {
  const state = {
    data: {
      elements: [1,2,3],
      property: 'someValue'
    }
  }
  const payload = {
    property: 'anotherValue'
  }
  const anotherPayload = {
    property: 'anotherPayloadValue'
  }

  it('should return unmodified state on empty payload', () => {
    const actionResult = updateAction(state, {});
    expect(actionResult).not.toBe(state); // as of new object
    expect(JSON.stringify(actionResult)).toBe(JSON.stringify(state)); // but value should be equal
  });

  it('should update data element with payload', () => {
    const actionResult = updateAction(state, payload);
    const expectedResult = Object.assign(JSON.parse(JSON.stringify(state)));
    const anotherExpectedResult = Object.assign(JSON.parse(JSON.stringify(state)));
    expectedResult.data.property = 'anotherValue';
    expect(JSON.stringify(actionResult)).toBe(JSON.stringify(expectedResult));

    const anotherActionResult = updateAction(actionResult, anotherPayload);
    anotherExpectedResult.data.property = 'anotherPayloadValue';
    expect(JSON.stringify(anotherActionResult)).toBe(JSON.stringify(anotherExpectedResult));
  });
});
