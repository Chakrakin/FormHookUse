import React from 'react';
import {useForm} from 'react-hook-form';
import {useStateMachine} from 'little-state-machine';
import {updateAction} from './updateAction';

export const WizardStatefulStep2 = props => {
  const {register, handleSubmit} = useForm();
  const {action, state} = useStateMachine(updateAction)
  const onSubmit = data => {
    action(data); // send the payload to the updateAction FN
    props.history.push("./result");
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="age">Age</label>
        <input name="age" ref={register} defaultValue={state.data.age}/>
      </div>
      <input type="submit" />
    </form>
  )
}
