import {createMemoryHistory} from 'history';
import {mockSteps} from '../../testConstants';
import {screen, render} from '@testing-library/react';
import {WizardRoutes} from './WizardRoutes';
import React from 'react';
import {Router} from 'react-router-dom';
import {createStore, StateMachineProvider} from 'little-state-machine';

createStore({
  data: {}
});

describe('WizardRoutes', () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory({});
  });

  beforeEach(() => {
    renderWithStateMachine(<WizardRoutes history={history}/>)
  });

  it('should have all steps displayed', () => {
    mockSteps.map(step => expect(screen.getByText(step.title)).toBeInTheDocument())
  });

  it('should have all steps rendered - data-testid method', () => {
    expect(screen.getAllByTestId('wizardRouteAwareStep').length).toBeTruthy();
  });

  it('should display component on routechange', async () => {
    // tap through all steps
    mockSteps.map(step => {
      history.push(step.forRoute);
      expect(screen.getByTestId(step.testId)).toBeInTheDocument();
    })
  });

  const renderWithStateMachine = (ui) => ({ ...render(<StateMachineProvider>{ui}</StateMachineProvider>) })
});
