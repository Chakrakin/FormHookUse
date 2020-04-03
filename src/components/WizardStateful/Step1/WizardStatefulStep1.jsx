import React from 'react';
import {useForm} from 'react-hook-form';
import {useStateMachine} from 'little-state-machine';
import {updateAction} from '../updateAction';
import validationSchemaStep1 from './validation';

export const WizardStatefulStep1 = props => {
  const {register, handleSubmit, errors} = useForm({validationSchema: validationSchemaStep1});
  const {action, state} = useStateMachine(updateAction)
  const onSubmit = data => {
    action(data); // send the payload to the updateAction FN
    props.history.push("./step2");
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="wizardStatefulStep1">
      <div>
        <label htmlFor="firstName">First Name</label>
        <input name="firstName" ref={register} defaultValue={state.data.firstName}/>
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input name="lastName" ref={register} defaultValue={state.data.lastName}/>
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <input type="submit" />
    </form>
  )
}
