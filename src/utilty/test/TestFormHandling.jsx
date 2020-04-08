import {FormContext, useForm} from 'react-hook-form';
import React from 'react';

const testPrevFn = jest.fn()
const testNextFn = jest.fn()
const testSubmitFn = jest.fn()

const TestForm = ({children}) => {
  const methods = useForm();
  return  (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(testSubmitFn)}>{children}</form>
    </FormContext>
  )
}

// provide a api instead of exporting all parts - pollutes intellisense
export default {
  actions: {
    prev: testPrevFn,
    next: testNextFn,
    submit: testSubmitFn
  },
  Form: TestForm
}
