import {WizardStatefulSummary} from './WizardStatefulSummary';
import React from 'react';
import {screen} from '@testing-library/react';
import TSuit from '../../../utilty/test/TestFormHandling';
import {createStore} from 'little-state-machine';

const filledStore = {data: {firstName: "Mad", lastName: "Max", age: 18}}

createStore(filledStore);
describe('WizardStatefulSummary', () => {
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

const matchesStateStringify = (content, element) => content.replace(/\s+/g, '') === JSON.stringify(filledStore)
