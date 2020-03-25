import Input from '../components/Input';
import React from 'react';
import {numberValidator} from '../utilty/validation/ValidationHandlers';

// assembly & rendering of component with all params filled
export const basicControlElement = Component => validator => state => {
  //bad!! sideeffect ...//TODO rework
  const valueChange = (val) => state.value = val
  return () => <div><Component {...state} valueChange={valueChange} />validate: {validator(state.value).toString()}</div>
}

// Plain Input
export const InputElement = basicControlElement(Input)

// Validated Input
export const ValidatedNumberInput = InputElement(numberValidator)

// helper to handle undefined state
// export const applyState = (comp, state) => comp(state || {})
// export const applyStateToComponents = (comps, state) => comps.map(comp => comp(state || {}))
