import {WizardStatefulStep2} from './WizardStatefulStep2';
import React from 'react';
import {screen} from '@testing-library/react';
import TSuit from '../../../utilty/test/TestFormHandling';
import {createStore} from 'little-state-machine';

createStore({
  data: {}
});
describe('WizardStatefulStep2', () => {
  let componentUnderTest;
  beforeEach(() => {
    componentUnderTest = TSuit.renderWithStateMachine(<WizardStatefulStep2 />);
  });

  it('should display age inputcontrol, submit and back button', () => {
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should handle age errors on values below 18 or string and handle error message removal automatically on valid input afterwards', async () => {
    const ageTestSampler = [
      {right: '18', wrong: '17', selector: screen.getByTestId('age-form-field'), validationMessage: 'age must be greater than or equal to 18', submitText: 'Submit'},
      {right: '18', wrong: 'dd', selector: screen.getByTestId('age-form-field'), validationMessage: 'age must be a number', submitText: 'Submit'}
    ]
    await TSuit.executeTestsForSamples(componentUnderTest, ageTestSampler, <WizardStatefulStep2 />)
  });
});
