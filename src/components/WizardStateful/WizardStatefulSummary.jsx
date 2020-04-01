import React from 'react';
import {useStateMachine} from 'little-state-machine';
import {updateAction} from './updateAction';

export const WizardStatefulSummary = () => {
  const {state} = useStateMachine(updateAction)
  return (
    <pre>{JSON.stringify(state, null, 2)}</pre>
  )
}
