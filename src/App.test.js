import React from 'react';
import { screen, render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App/>);
  });

  it('should have a Wizard Example headline', () => {
    expect(screen.getByText('Wizard Example')).toBeInTheDocument();
  });

  it('should have a React Hook Form example displayed', () => {
    expect(screen.getByTestId('rhfexample')).toBeTruthy();
  });

  it('should have a wizard displayed', () => {
    expect(screen.getByTestId('wizardForm')).toBeInTheDocument();
  });

  it('should have a stateful wizard displayed', () => {
    expect(screen.getByTestId('wizardFormStateful')).toBeInTheDocument();
  });

  it('should have a HookSelf displayed', () => {
    expect(screen.getByTestId('hookShelf')).toBeInTheDocument();
  });
});

