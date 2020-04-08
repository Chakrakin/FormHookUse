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
  Form: TestForm,
  resetAllMocks: () => {
    testPrevFn.mockClear();
    testNextFn.mockClear();
    testSubmitFn.mockClear();
  }
}

/*
maybe for later - still needs some work
export default () => {
  const testPrevFn = jest.fn();
  const testNextFn = jest.fn();
  const testSubmitFn = jest.fn();

  const TestForm = ({children}) => {
    const methods = useForm();
    return  (
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(testSubmitFn)}>{children}</form>
      </FormContext>
    )
  }
  // provide a api instead of exporting all parts - pollutes intellisense
  return {
    actions: {
      prev: testPrevFn,
      next: testNextFn,
      submit: testSubmitFn
    },
    Form: TestForm,
    resetMocks: () => {
      testPrevFn.mockClear();
      testNextFn.mockClear();
      testSubmitFn.mockClear();
    }
  }
}

 */
