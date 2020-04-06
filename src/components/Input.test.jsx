import Input from './Input';
import React from 'react';
import {render, fireEvent} from '@testing-library/react';

const spyFn = jest.fn();

describe('Input', () => {
  it('should have its value changed', () => {
    const { getByPlaceholderText } = render(<Input valueChange={spyFn} />);
    fireEvent.change(getByPlaceholderText('enter'), { target: { value: 1 } });
    expect(spyFn).toHaveBeenCalledWith("1"); // as event target values are stings
    fireEvent.change(getByPlaceholderText('enter'), { target: { value: '2' } });
    expect(spyFn).toHaveBeenCalledWith("2");
  });
});
