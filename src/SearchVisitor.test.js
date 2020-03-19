import React from 'react';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

import { toBeEmpty, toBeVisible } from '@testing-library/jest-dom';
import SearchVisitor from './SearchVisitor';

expect.extend({ toBeVisible, toBeEmpty });

const getMockedComponent = (propOverride = {}) => {
  const defaultProps = {
    queryVisitors: () => {}
  };

  const updatedProps = Object.assign(defaultProps, propOverride);

  return <SearchVisitor {...updatedProps} />;
};

describe('<SearchVisitor />', () => {
  afterEach(cleanup);

  test('renders without exploding', () => {
    const { container } = render(getMockedComponent());
    expect(container).toBeVisible();
  });

  test('queryVisitors function prop is called after entering search term', async () => {
    const overrides = {
      queryVisitors: jest.fn(() => Promise.resolve())
    };

    const { container } = render(getMockedComponent(overrides));

    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 'search text' } });

    await wait(() => {
      expect(overrides.queryVisitors).toBeCalled();
    });
  });
});
