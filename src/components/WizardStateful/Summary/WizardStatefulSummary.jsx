import React from 'react';
import {useStateMachine} from 'little-state-machine';
import {updateAction} from '../updateAction';

export const WizardStatefulSummary = props => {
  const {action, state} = useStateMachine(updateAction)
  const restart = () => {
    action({});
    props.history.push('/step1')
  }
  return (
    <div data-testid="wizardStatefulSummary">
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={restart}>Restart</button>
    </div>
  )
}
