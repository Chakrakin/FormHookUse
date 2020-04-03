import React from 'react';
import { useForm } from 'react-hook-form';
import {InputDependentValidation} from './components/controls/Controls';

/**
 * could be used for each step in a form for validation
 */
export default () => {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => { console.log(data) }

  // console.log(watch('example')) // watch input value by passing the name of it
  // console.log(watch('exampleRequired')) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="rhfexample">
      {/* register your input into the hook by invoking the "register" function */}
      <div>
          <input name="example" defaultValue="test" ref={register} />
      </div>
      {/* include validation with required or other standard HTML validation rules */}
      <div>
        <input name="exampleRequired" ref={register({ required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
      </div>
      <div>
        <InputDependentValidation register={register} dependentFieldValue="aa" name="test" />
        {errors.test && errors.test.type === 'validate' && <span>its not "aa"</span>}
        {/*or just the message provided by validation*/}
        {errors.test && ' | ' + errors.test.message}
      </div>
      <input type="submit" />
    </form>
)
}
