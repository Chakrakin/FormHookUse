import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import HookShelf from './HookShelf';
import userEvent from '@testing-library/user-event';

describe('HookShelf', () => {
  beforeEach(() => {
    render(<HookShelf />)
  });

  it('should render an input for somevalue', () => {
    expect(screen.getByPlaceholderText('someValue')).toBeInTheDocument();
  });

  it('should update hook state to match value from inputfield', () => {
    const inputUnderTest = 'another value';
    expect(screen.getByText('current State value:'));
    fireEvent.input(screen.getByPlaceholderText('someValue'), {target: {value: inputUnderTest}});
    expect(screen.getByText('current State value: ' + inputUnderTest))
  });

  it('should have a button to verify input', () => {
    fireEvent.click(screen.getByText('Verify'));
    expect(screen.queryByText('ManualButtonVerify: testValue = true')).not.toBeInTheDocument();
    fireEvent.input(screen.getByPlaceholderText('someValue'), {target: {value: 'testValue'}});
    fireEvent.click(screen.getByText('Verify'));
    // elements needs to be wrapped - getByText looksup the textContent property on that
    expect(screen.getByText('ManualButtonVerify: testValue = true')).toBeInTheDocument();
  });

  it('should count letters and updates on each keystroke', () => {
    expect(screen.getByText('Lettercount: 0')).toBeInTheDocument();
    //use userEvent for simulating exact behaviour on (f.e.) keystrokes
    userEvent.type(screen.getByTestId('someValue'), 'A');
    expect(screen.getByText('Lettercount: 1')).toBeInTheDocument();
    userEvent.type(screen.getByTestId('someValue'), 'AB');
    expect(screen.getByText('Lettercount: 2')).toBeInTheDocument();
    expect(screen.getByText('current State value: AB')).toBeInTheDocument();
  });
});
