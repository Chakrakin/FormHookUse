import {WizardStatefulStep2} from './WizardStatefulStep2';
import React from 'react';
import {act, fireEvent, screen} from '@testing-library/react';
import TSuit from '../../../utilty/test/TestFormHandling';
import {createStore} from 'little-state-machine';
import {createMemoryHistory} from 'history';

createStore({
  data: {}
});
describe('WizardStatefulStep2', () => {
  describe('Form Validation', () => {
    let componentUnderTest;
    beforeEach(() => {
      componentUnderTest = TSuit.renderWithStateMachine(<WizardStatefulStep2 />);
    });

    it('should display age inputcontrol, submit and back button', async () => {
      await act(async () => {
        expect(screen.getByText('Age')).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
      });
    });

    it('should handle age errors on values below 18 or string and handle error message removal automatically on valid input afterwards', async () => {
      const ageTestSampler = [
        {right: '18', wrong: '17', selector: screen.getByTestId('age-form-field'), validationMessage: 'age must be greater than or equal to 18', submitText: 'Submit'},
        {right: '18', wrong: 'dd', selector: screen.getByTestId('age-form-field'), validationMessage: 'age must be a number', submitText: 'Submit'}
      ]
      await TSuit.executeTestsForSamples(componentUnderTest, ageTestSampler, <WizardStatefulStep2 />)
    });

    it('should have a checkbox to display buy state', async () => {
      await act(async () => {
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
      });
    });

    it('should have a credit card field that is visible only when checkbox is checked and age is > 18', async () => {
      await act(async () => {
        fireEvent.input(screen.getByTestId('age-form-field'), {target: {value: 18}});
        fireEvent.click(screen.getByRole('checkbox'));
      });
      expect(screen.getByPlaceholderText('numbercheck')).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(screen.getByRole('checkbox'));
      });
      expect(screen.queryByPlaceholderText('numbercheck')).not.toBeInTheDocument();
      await act(async () => {
        fireEvent.click(screen.getByRole('checkbox'));
      });
      expect(screen.getByPlaceholderText('numbercheck')).toBeInTheDocument();
      await act(async () => {
        fireEvent.input(screen.getByTestId('age-form-field'), {target: {value: 17}});
      });
      expect(screen.queryByPlaceholderText('numbercheck')).not.toBeInTheDocument();
    });
  });
  describe('Back', () => {
    it('should push to first step on pushing back button', async () => {
      const hist = createMemoryHistory();
      const spyPush = jest.spyOn(hist, 'push');
      TSuit.renderWithRouter(TSuit.withStateMachine(<WizardStatefulStep2 history={hist}/>));
      await act(async () => {
        fireEvent.click(screen.getByText('Back'));
      });
      expect(spyPush).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledWith('/step1');
    });
  });
  describe('Submit', () => {
    it('should push to next step after submitting an valid form', async () => {
      const hist = createMemoryHistory();
      const spyPush = jest.spyOn(hist, 'push');
      TSuit.renderWithRouter(TSuit.withStateMachine(<WizardStatefulStep2 history={hist}/>));
      await act(async () => {
        fireEvent.input(screen.getByTestId('age-form-field'), {target: {value: 18}});
        fireEvent.click(screen.getByText('Submit'));
      });
      expect(spyPush).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledWith('/summary');
    });
  });
});
