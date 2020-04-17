import React, {useEffect, useReducer, useState} from 'react';

const initialState = {
  someValue: "",
  isValid: false,
  letterCount: 0
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'VALID_VIA_BUTTON':
      return { ...state, someValue: action.payload, isValid: true}
    case 'INVALID_VIA_BUTTON':
      return { ...state, someValue: action.payload, isValid: false}
    case 'VALUE_THROUGH_EFFECT':
      const length = action.payload && action.payload.length || 0;
      return { ...state, letterCount: length}
    default:
      return state
  }
}

export default () => {
  const [val, setVal] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState, () => initialState);
  const validate = () => {
    const ACTION = val === 'testValue' ? 'VALID_VIA_BUTTON' : 'INVALID_VIA_BUTTON';
    dispatch({ type: ACTION, payload: val});
  }
  useEffect(() => dispatch({type: 'VALUE_THROUGH_EFFECT', payload: val}), [val]);
  return <div data-testid="hookShelf">
    <input placeholder="someValue" onChange={e => setVal(e.target.value)} data-testid="someValue"/>
    current State value: {val}
    <button onClick={validate}>Verify</button>
    <div>ManualButtonVerify: {state.someValue} = {state.isValid.toString()}</div>
    <div>Lettercount: {state.letterCount}</div>
  </div>
}
