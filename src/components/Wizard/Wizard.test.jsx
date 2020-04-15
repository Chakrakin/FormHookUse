import Wizard from './Wizard';
import React from 'react';
import {render, screen} from '@testing-library/react';

describe('Wizard', () => {
  beforeEach(() => {
    render(<Wizard />);
  });

  it('should display the wizard', () => {
    expect(screen.getByTestId('wizardForm')).toBeInTheDocument();
  });
});
