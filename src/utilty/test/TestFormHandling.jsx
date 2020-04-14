import {FormContext, useForm} from 'react-hook-form';
import React from 'react';
import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import {StateMachineProvider} from 'little-state-machine';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

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

const withStateMachine = (ui) => <StateMachineProvider>{ui}</StateMachineProvider>;
const renderWithStateMachine = (ui) => render(withStateMachine(ui));

const renderWithRouter = (ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }), } = {}
) => ({...render(<Router history={history}>{ui}</Router>), history})

const executeTestsForSamples = async (componentUnderTest, sampler, ui) => {
  for(const sample of sampler) {
    // rerender needs a valid React.ReactElement - not a RenderResult from render
    componentUnderTest.rerender(withStateMachine(ui));
    await inputControlElementValidationTest(sample);
  }
}

const inputControlElementValidationTest = async ({right, wrong, selector, validationMessage, submitText}) => {
  fireEvent.input(selector, {target: {value: wrong}});
  expect(screen.queryByText(validationMessage)).not.toBeInTheDocument();
  fireEvent.click(screen.getByText(submitText));
  await waitFor(() => screen.getByText(validationMessage));
  expect(selector).toHaveValue(wrong);
  expect(screen.getByText(validationMessage)).toBeInTheDocument();
  fireEvent.input(selector, {target: {value: right}});
  // input should automatically trigger revalidation
  await waitForElementToBeRemoved(() => screen.queryByText(validationMessage))
  expect(screen.queryByText(validationMessage)).not.toBeInTheDocument();
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
  },
  withStateMachine,
  renderWithStateMachine,
  renderWithRouter,
  executeTestsForSamples,
  inputControlElementValidationTest,
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
