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
  return (<div style={{display: visible ? '' : 'none' }}>

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
      type="button"
      onClick={async () => {
        const result = await triggerValidation(["shortPhone3", "shortPhone4", "shortPhone5", 'another']);
        if (result) { nextPage() }
      }}
    >
      UserForm-Next
    </button>
  </div>)
}
