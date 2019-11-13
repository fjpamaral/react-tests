import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import { addTech } from '~/store/modules/techs/actions';
import TechListRedux from '~/components/TechListRedux';

jest.mock('react-redux');

describe('TechListRedux Component', () => {
  it('should render tech list', () => {
    useSelector.mockImplementation(cb => cb({
      techs: ['Node.js', 'ReactJS']
    }));

    const { getByTestId, getByText } = render(<TechListRedux />);

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
  });

  it('should be able to add new tech', () => {
    const { getByTestId, getByLabelText } = render(<TechListRedux />);

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' }});
    fireEvent.submit(getByTestId('tech-form'));

    expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
  });
});