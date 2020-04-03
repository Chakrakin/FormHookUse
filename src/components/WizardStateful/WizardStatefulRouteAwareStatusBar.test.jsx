import React from 'react';
import WizardStatefulRouteAwareStatusBar from './WizardStatefulRouteAwareStatusBar';
import {screen, render, cleanup} from '@testing-library/react';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom';
import {mockSteps} from '../../testConstants';

describe('WizardStatefulRouteAwareStatusBar', () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory({initialEntries: [mockSteps[0].forRoute]});
  });

  beforeEach(() => {
    renderWithRouter(<WizardStatefulRouteAwareStatusBar elements={mockSteps} />)
  })

  it('should display all steps', () => {
    mockSteps.map(step => expect(screen.getByText(step.title)).toBeTruthy())
  });

  it('should display all steps - data-testid array method', () => {
    expect(screen.getAllByTestId('wizardRouteAwareStep').length).toBe(mockSteps.length);
  });

  it('should have only one highlighted step', () => {
    const steps = screen.getAllByTestId('wizardRouteAwareStep');
    const activeCount = countByTerm(steps, 'className', 'active')
    expect(activeCount).toBe(1);
    // perform a route change and test again
    history.push(mockSteps[1].forRoute);
    const stepsAfterRouteChange = screen.getAllByTestId('wizardRouteAwareStep');
    const activeCountAfterRouteChange = countByTerm(stepsAfterRouteChange, 'className', 'active');
    expect(activeCountAfterRouteChange).toBe(1);
  });

  it('should have the active location highlighted', () => {
    mockSteps.map(step => {
      history.push(step.forRoute);
      expect(screen.getByText(step.title)).toHaveClass('active');
    })
  });

  const renderWithRouter = (ui) => ({ ...render(<Router history={history}>{ui}</Router>), history })
  const countByTerm = (list, selector, term) => list.reduce((acc, next) => acc + next[selector].includes(term) ? 1 : 0, 0)
});
