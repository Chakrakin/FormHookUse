import CartForm from './CartForm';
import React from 'react';
import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import {FormContext, useForm} from 'react-hook-form';

describe('CartForm', () => {
  const prevFn = () => {}
  const submitFn = () => {}
  let renderMethods;

  describe('visible', () => {
    beforeEach(() => {
      renderMethods = render(<TestForm><CartForm visible={true} previousPage={prevFn}/></TestForm>);
    })

    it('should be visible if visibility true is passed', () => {
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('should display error on wrong email format when submit button is pressed and remove error on valid email automatically', async () => {
      const wrongEmail = 'wrong';
      const correctEmail = 'a@b.com';
      fireEvent.change(screen.getByPlaceholderText('Email'), {target: {value: wrongEmail}});
      expect(screen.queryByText('email is wrong')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('finalize'));
      await waitFor(() => screen.getByText('email is wrong'));
      expect(screen.getByText('email is wrong')).toBeInTheDocument();
      fireEvent.change(screen.getByDisplayValue(wrongEmail), {target: {value: correctEmail}});
      fireEvent.click(screen.getByText('finalize'));
      await waitForElementToBeRemoved(() => screen.queryByText('email is wrong'))
      expect(screen.queryByText('email is wrong')).not.toBeInTheDocument();
    });
  });

  describe('invisible', () => {
    it('should be invisible if visibility false is passed', () => {
      render(<TestForm><CartForm visible={false} previousPage={prevFn}/></TestForm>);
      expect(screen.getByText('Email')).not.toBeVisible();
    });
  });

  const TestForm = ({children}) => {
    const methods = useForm();
    return  (
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(submitFn)}>{children}</form>
      </FormContext>
    )
  }
});
