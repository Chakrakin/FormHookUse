import React from 'react';
import {useForm} from 'react-hook-form';
import {useStateMachine} from 'little-state-machine';
import {updateAction} from '../updateAction';
import validationSchemaStep2 from './validation';

export const WizardStatefulStep2 = props => {
  const {register, handleSubmit, errors} = useForm({validationSchema: validationSchemaStep2});
  const {action, state} = useStateMachine(updateAction)
  const onSubmit = data => {
    action(data); // send the payload to the updateAction FN
    props.history.push("./summary");
  }
  const back = () => {
    props.history.push('/step1')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="wizardStatefulStep2">
      <div>
        <label htmlFor="age">Age</label>
        <input name="age" ref={register} defaultValue={state.data.age}/>
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <button onClick={back}>Back</button>
      <input type="submit" />
    </form>
  )
}
