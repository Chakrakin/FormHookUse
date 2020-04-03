import {WizardStateful} from './WizardStateful';
import React from 'react';
import {render, screen} from '@testing-library/react';

describe('WizardStateful', () => {
  it('should display the wizard', () => {
    render(<WizardStateful/>)
    expect(screen.getByTestId('wizardFormStateful')).toBeInTheDocument();
    expect(screen.getAllByTestId('wizardRouteAwareStep').length).toBeTruthy()
  });
});
