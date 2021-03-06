import {WizardStatefulStep1} from './WizardStatefulStep1';
import React from 'react';
import {act, fireEvent, screen} from '@testing-library/react';
import TSuit from '../../../utilty/test/TestFormHandling';
import {createMemoryHistory} from 'history';

describe('WizardStatefulStep1', () => {
  describe('Form Validation', () => {
    let componentUnderTest;
    beforeEach(() => {
      componentUnderTest = TSuit.renderWithStateMachine(<WizardStatefulStep1 />);
    })

    it('should render firstname & lastname inputcontrols and submit button', () => {
      expect(screen.getByText('First Name')).toBeInTheDocument();
      expect(screen.getByText('Last Name')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('should handle firstName errors on invalid values and handle error message removal automatically on valid input afterwards', async () => {
      const firstNameTestSampler = [
        {right: 'firstname', wrong: 'na', selector: screen.getByPlaceholderText('firstName'), validationMessage: 'firstName must be at least 3 characters', submitText: 'Submit'},
      ]
      await TSuit.executeTestsForSamples(componentUnderTest, firstNameTestSampler, <WizardStatefulStep1 />);
    });

    it('should handle lastName errors on invalid values and handle error message removal automatically on valid input afterwards', async () => {
      const lastNameTestSampler = [
        {right: 'lastname', wrong: '', selector: screen.getByPlaceholderText('lastName'), validationMessage: 'lastName is a required field', submitText: 'Submit'},
      ]
      await TSuit.executeTestsForSamples(componentUnderTest, lastNameTestSampler, <WizardStatefulStep1 />);
    });
  });

  describe('Submit', () => {
    it('should push to next step after submitting an valid form', async () => {
      const hist = createMemoryHistory();
      const spyPush = jest.spyOn(hist, 'push');
      TSuit.renderWithRouter(TSuit.withStateMachine(<WizardStatefulStep1 history={hist}/>))
      await act(async () => {
        fireEvent.input(screen.getByPlaceholderText('firstName'), {target: {value: 'first'}});
        fireEvent.input(screen.getByPlaceholderText('lastName'), {target: {value: 'last'}});
        fireEvent.click(screen.getByText('Submit'));
      });
      expect(spyPush).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledWith('/step2');
    });
  });
});

