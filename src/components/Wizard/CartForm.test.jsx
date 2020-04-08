import CartForm from './CartForm';
import React from 'react';
import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import TSuit from '../../utilty/test/TestFormHandling';

describe('CartForm', () => {

  describe('visible', () => {
    it('should be visible if visibility true is passed', () => {
      render(<TSuit.Form><CartForm visible={true} previousPage={TSuit.actions.prev}/></TSuit.Form>);
      expect(screen.getByText('Email')).toBeInTheDocument();
    });
  });

  describe('invisible', () => {
    it('should be invisible if visibility false is passed', () => {
      render(<TSuit.Form><CartForm visible={false} previousPage={TSuit.actions.prev}/></TSuit.Form>);
      expect(screen.getByPlaceholderText('Email')).not.toBeVisible();
    });
  });

  describe('input controls', () => {
    const wrongEmail = 'wrong';
    const correctEmail = 'a@b.com';
    const controlTests = {
      emailVerify: [
        {right: 'a@b.com', wrong: '', expectedValidationMessage: 'email missing!'},
        {right: 'a@b.com', wrong: 'wrong', expectedValidationMessage: 'email is wrong'}
        ]
    }

    beforeEach(() => {
      render(<TSuit.Form><CartForm visible={true} previousPage={TSuit.actions.prev}/></TSuit.Form>);
    });

    it('should display error on wrong email format when submit button is pressed', async () => {
      for (const testCase of controlTests.emailVerify) {
        fireEvent.change(screen.getByPlaceholderText('Email'), {target: {value: testCase.wrong}});
        expect(screen.queryByText(testCase.expectedValidationMessage)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('finalize'));
        await waitFor(() => screen.getByText(testCase.expectedValidationMessage));
        expect(screen.getByText(testCase.expectedValidationMessage)).toBeInTheDocument();
      }
    });

    it('should remove error on valid email automatically', async () => {
      fireEvent.change(screen.getByPlaceholderText('Email'), {target: {value: wrongEmail}});
      fireEvent.click(screen.getByText('finalize'));
      await waitFor(() => screen.getByText('email is wrong'));
      expect(screen.getByText('email is wrong')).toBeInTheDocument();
      fireEvent.input(screen.getByDisplayValue(wrongEmail), {target: {value: correctEmail}});
      await waitForElementToBeRemoved(() => screen.queryByText('email is wrong'))
      expect(screen.getByDisplayValue(correctEmail).value).toBeTruthy();
      expect(screen.queryByText('email is wrong')).not.toBeInTheDocument();
    });
  });

  describe('input controls', () => {
    let componentUnderTest;

    beforeEach(() => {
      componentUnderTest = render(<TSuit.Form><CartForm visible={true} previousPage={TSuit.actions.prev}/></TSuit.Form>);
    })

    it('should handle email errors on invalid values and handle error message removal automatically on valid input afterwards', async () => {
      const emailTestSampler = [ // ToDo: refactor to composable test data
        {right: 'a@b.com', wrong: '', testId: 'email-form-field', validationMessage: 'email missing!', submitText: 'finalize'},
        {right: 'a@b.com', wrong: 'wrong', testId: 'email-form-field', validationMessage: 'email is wrong', submitText: 'finalize'},
        {right: 'a@b.com', wrong: 'a@b', testId: 'email-form-field', validationMessage: 'email is wrong', submitText: 'finalize'},
        {right: 'a@b.com', wrong: '@b.com', testId: 'email-form-field', validationMessage: 'email is wrong', submitText: 'finalize'},
        {right: 'a@b.com', wrong: 'a@.com', testId: 'email-form-field', validationMessage: 'email is wrong', submitText: 'finalize'}
      ]
      await executeTestsForSamples(componentUnderTest, emailTestSampler);
    });

    it('should handle email errors on invalid values and handle error message removal automatically on valid input afterwards', async () => {
      const mobileNumberTestSampler = [ // ToDo: refactor to composable test data
        {right: '123456789', wrong: '', testId: 'mobilenumber-form-field', validationMessage: 'mobileNumber missing!', submitText: 'finalize'},
        {right: '123456789', wrong: '123456789123456789', testId: 'mobilenumber-form-field', validationMessage: 'mobileNumber is too long', submitText: 'finalize'},
        {right: '123456789', wrong: '12345', testId: 'mobilenumber-form-field', validationMessage: 'mobileNumber is too short', submitText: 'finalize'},
      ]
      await executeTestsForSamples(componentUnderTest, mobileNumberTestSampler);
    });
  });
});

const executeTestsForSamples = async (componentUnderTest, sampler) => {
  for(const sample of sampler) { // remember - dont use map as it doesnt wait for async/await
    //rerender to explicitly recreate this component under test every time
    componentUnderTest.rerender(<TSuit.Form><CartForm visible={true} previousPage={TSuit.actions.prev}/></TSuit.Form>);
    await inputControlElementValidationTest(sample);
  }
}

const inputControlElementValidationTest = async ({right, wrong, testId, validationMessage, submitText}) => {
  const selector = screen.getByTestId(testId);
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
