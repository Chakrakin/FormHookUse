import React from 'react';
import {ErrorMessage, useFormContext} from 'react-hook-form';
import {
  ShortPhoneNumberWithNameStatic,
  ShortPhoneNumberWithName,
  ShortPhoneNumberComponentProvided,
  ShortPhoneNumberComponentNoName
} from '../controls/Controls';

export default ({visible, nextPage}) => {
  const { register, triggerValidation, errors } = useFormContext();

  // console.log(errors)

  return (<div style={{display: visible ? '' : 'none' }}>
    <div>
      <label>First name</label>
      <input
        type="text"
        name="firstName"
        ref={register({ required: true, maxLength: 80 })}
      />
      {errors.firstName && 'This one is missing'}
    </div>
    <div>
      <label>Last name</label>
      <input
        type="text"
        name="lastName"
        ref={register({ required: true, maxLength: 100 })}
      />
      {errors.lastName && 'This one is missing'}
    </div>
    <div>
      <label>ShortPhone 3</label>
      <ShortPhoneNumberWithNameStatic />
      {/*Built-in Object for errors*/}
      <ErrorMessage errors={errors} name="shortPhone3" />
    </div>
    <div>
      <label>ShortPhone 4</label>
      <ShortPhoneNumberWithName />
      {/*Manual output of errors*/}
      {errors.shortPhone4 && errors.shortPhone4.type === 'required' && 'bla is required'}
      {errors.shortPhone4 && errors.shortPhone4.type === 'minLength' && 'bla is too short'}
      {errors.shortPhone4 && errors.shortPhone4.type === 'maxLength' && 'bla is too long'}
      {errors.shortPhone4 && errors.shortPhone4.type === 'pattern' && 'bla is wrong'}
    </div>

    {/*good but still ... meh*/}
    <div>
      <label>ShortPhone 5</label>
      <ShortPhoneNumberComponentProvided />
      {/*Built-in Object for errors*/}
      <ErrorMessage errors={errors} name="shortPhone5" />
    </div>

    {/*the good stuff*/}
    <ShortPhoneNumberComponentNoName name="another" errors={errors} />

    {/*doesnt work because of reinitialization on rerender - effecthook for formContext? ... nah ...*/}
    {/*<PhoneItem title="Show this" name="phony" errors={errors} />*/}

    <button
      onClick={async () => {
        await triggerValidation(["firstName", "lastName", "shortPhone3", "shortPhone4", "shortPhone5", 'another'])
        && nextPage()
      }}
    >
      UserForm-Next
    </button>
  </div>)
}
