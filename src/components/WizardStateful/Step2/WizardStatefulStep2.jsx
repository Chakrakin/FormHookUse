import React from 'react';
import {useForm} from 'react-hook-form';
import {useStateMachine} from 'little-state-machine';
import {updateAction} from '../updateAction';
import validationSchemaStep2 from './validation';

export const WizardStatefulStep2 = props => {
  const {register, handleSubmit, errors, watch, formState} = useForm({validationSchema: validationSchemaStep2});
  const {action, state} = useStateMachine(updateAction);
  const buy = watch('buy');
  const age = watch('age');
  const onSubmit = data => {
    action(data); // send the payload to the updateAction FN
    props.history.push('/summary');
  }
  const back = () => {
    props.history.push('/step1');
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="wizardStatefulStep2">
      <div>
        Formstate: {<pre>{JSON.stringify(formState, null, 2) }</pre>}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input name="age" ref={register} defaultValue={state.data.age} data-testid="age-form-field"/>
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label htmlFor="buy">Buy</label>
        <input name="buy" type="checkbox" ref={register} defaultValue={state.data.buy} data-testid="buy-form-field"/>
      </div>
      <div>
        {buy && age >= 18 && <>
            <label htmlFor="numbercheck">Numbercheck</label>
            <input name="numbercheck" ref={register} defaultValue={state.data.numbercheck} placeholder="numbercheck" data-testid="numbercheck-form-field"/>
            {errors.numbercheck && <p>{errors.numbercheck.message}</p>}
          </>
        }
      </div>
      <button onClick={back}>Back</button>
      <input type="submit" value="Submit" />
    </form>
  )
}
