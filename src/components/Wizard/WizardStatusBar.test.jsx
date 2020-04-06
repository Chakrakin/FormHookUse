import WizardStatusBar from './WizardStatusBar';
import {mockSteps} from '../../testConstants';
import React from 'react';
import {render, screen} from '@testing-library/react';

describe('WizardStatusBar', () => {
  let renderElements;
  const startStatus = 1;

  beforeEach(() => {
    renderElements = render(<WizardStatusBar elements={mockSteps} status={startStatus}/>)
  })

  it('should display all steps', () => {
    mockSteps.map(step => expect(screen.getByText(step.title)).toBeTruthy())
  });

  it('should have only one active element', () => {
    const activeCount = mockSteps.reduce(
      (acc, next) => acc + screen.getByText(next.title).className.includes('active') ? 1 : 0,
      0)
    expect(activeCount).toBe(1);
  });

  it('should change active state on step switch', () => {
    expect(screen.getByText(mockSteps[startStatus - 1].title).className).toContain('active');
    renderElements.rerender(<WizardStatusBar elements={mockSteps} status={startStatus + 1}/>)
    expect(screen.getByText(mockSteps[startStatus].title).className).toContain('active');
  });
});
