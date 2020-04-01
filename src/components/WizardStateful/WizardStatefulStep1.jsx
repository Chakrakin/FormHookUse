import React from 'react';
import {useForm} from 'react-hook-form';
import {useStateMachine} from 'little-state-machine';
import {updateAction} from './updateAction';

export const WizardStatefulStep1 = props => {
  const {register, handleSubmit} = useForm();
  const {action, state} = useStateMachine(updateAction)
  const onSubmit = data => {
    action(data); // send the payload to the updateAction FN
    props.history.push("./step2");
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input name="firstName" ref={register} defaultValue={state.data.firstName}/>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input name="lastName" ref={register} defaultValue={state.data.lastName}/>
      </div>
      <input type="submit" />
    </form>
  )
}
