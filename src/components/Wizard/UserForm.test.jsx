import React from 'react';
import {render, screen} from '@testing-library/react';
import TSuit from '../../utilty/test/TestFormHandling';
import UserForm from './UserForm';

describe('UserForm', () => {

  describe('visible', () => {
    beforeEach(() => {
      render(<TSuit.Form><UserForm visible={true} nextPage={TSuit.actions.next}/></TSuit.Form>);
    });

    it('should be visible if visibility true is passed', () => {
      expect(screen.getByText('Firstname')).toBeInTheDocument();
    });

    it('should display a short-phone-number - static composed - regex search', () => {
      expect(screen.getAllByPlaceholderText(/PhoneNr$/i).length).toBe(4);
      expect(screen.getAllByPlaceholderText(/^ShortPhone/i).length).toBe(4);
      expect(screen.getAllByPlaceholderText('ShortPhoneNr').length).toBe(4); // verify with simple string
      expect(screen.findAllByPlaceholderText(/^LongPhone/i).length).toBeUndefined(); // check findAll.. - we expect it not to be here
    });

    it('should render a custom composed short-phone-number input element', () => {

    });
  });

  describe('invisible', () => {
    it('should be invisible if visibility false is passed', () => {
      render(<TSuit.Form><UserForm visible={false} nextPage={TSuit.actions.next}/></TSuit.Form>);
      expect(screen.getByText('Firstname')).not.toBeVisible();
    });
  });

});
