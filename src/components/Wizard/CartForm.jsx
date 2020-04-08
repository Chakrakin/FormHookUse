import React from 'react';
import {useFormContext} from 'react-hook-form';

export default ({visible, previousPage}) => {
  const { register, errors } = useFormContext();
  return (<div style={{display: visible ? '' : 'none' }}>
    <div>
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          data-testid="email-form-field"
          ref={register({
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
      {errors.email && errors.email.type === 'required' && 'email missing!'}
      {errors.email && errors.email.type === 'pattern' && 'email is wrong'}
    </div>
    <div>
        <label>Mobile number</label>
        <input
          type="tel"
          name="mobileNumber"
          data-testid="mobilenumber-form-field"
          ref={register({ required: true, maxLength: 11, minLength: 8 })}
        />
      {errors.mobileNumber && errors.mobileNumber.type === 'required' && 'mobileNumber missing!'}
      {errors.mobileNumber && errors.mobileNumber.type === 'minLength' && 'mobileNumber is too short'}
      {errors.mobileNumber && errors.mobileNumber.type === 'maxLength' && 'mobileNumber is too long'}
    </div>
    <div>
      <label>Title</label>
      <select name="title" ref={register({ required: true })}>
        <option value="">Select</option>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>
      {errors.title && errors.title.type === 'required' && 'title missing!'}
    </div>
    <div>
      <label>Are you a developer?</label>
      <input
        name="developer"
        type="radio"
        value="Yes"
        ref={register({ required: true })}
      />
      <input
        name="developer"
        type="radio"
        value="No"
        ref={register({ required: true })}
      />
      {errors.developer && errors.developer.type === 'required' && 'developer missing!'}
    </div>
    <button type="button" onClick={() => previousPage()}>
      CartForm-Previous
    </button>
    <input type="submit" value="finalize"/>
  </div>)
}
