import {WizardStatefulSummary} from './WizardStatefulSummary';
import React from 'react';
import {act, fireEvent, screen} from '@testing-library/react';
import TSuit from '../../../utilty/test/TestFormHandling';
import {createStore} from 'little-state-machine';
import {createMemoryHistory} from 'history';

const filledStore = {data: {firstName: "Mad", lastName: "Max", age: 18}}

createStore(filledStore);

describe('WizardStatefulSummary', () => {
  describe('Result presentation', () => {
    let componentUnderTest;
    beforeEach(() => {
      componentUnderTest = TSuit.renderWithStateMachine(<WizardStatefulSummary />);
    });

    it('should display a restart button', () => {
      expect(screen.getByText('Restart')).toBeInTheDocument();
    });

    it('should output wizard state value as JSON', () => {
      expect(screen.getByText(matchesStateStringify)).toBeInTheDocument();
    });
  });

  describe('Reset', () => {
    it('should push to next step after submitting an valid form', async () => {
      const hist = createMemoryHistory();
      const spyPush = jest.spyOn(hist, 'push');
      TSuit.renderWithRouter(TSuit.withStateMachine(<WizardStatefulSummary history={hist}/>));
      await act(async () => {
        fireEvent.click(screen.getByText('Restart'));
      });
      expect(spyPush).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledWith('/step1');
    });
  });
});

const matchesStateStringify = (content, element) => content.replace(/\s+/g, '') === JSON.stringify(filledStore)
