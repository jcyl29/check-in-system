import React from 'react';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

import { toBeEmpty, toBeVisible } from '@testing-library/jest-dom';
import VisitorList from './VisitorList';

expect.extend({ toBeVisible, toBeEmpty });

const getMockedComponent = (propOverride = {}) => {
  const defaultProps = {
    data: [],
    signOutVisitor: () => {},
    isFilteredBySignout: false
  };

  const updatedProps = Object.assign(defaultProps, propOverride);

  return <VisitorList {...updatedProps} />;
};

describe('<VisitorList />', () => {
  afterEach(cleanup);

  test('renders without exploding', () => {
    const { container } = render(getMockedComponent());
    expect(container).toBeVisible();
  });

  test('renders correct message if no data passed', () => {
    const { getByText, container } = render(getMockedComponent());
    expect(container).toBeVisible();
    expect(getByText(/No results found/)).toBeVisible();
  });

  test('renders table rows if data is passed', () => {
    const overrides = {
      data: [
        {
          id: 123,
          name: 'some name',
          notes: 'some notes',
          signOut: null,
          loading: false
        },
        {
          id: 456,
          name: 'stuff',
          notes: 'ok',
          signOut: null,
          loading: false
        }
      ]
    };
    const { getByText, container } = render(getMockedComponent(overrides));
    expect(container).toBeVisible();
    overrides.data.forEach(data => {
      expect(getByText(data.name)).toBeVisible();
      expect(getByText(data.notes)).toBeVisible();
    });
  });

  test('renders correct message if data is passed, but isFilteredBySignout ends up filtering out all data', () => {
    const overrides = {
      isFilteredBySignout: true,
      data: [
        {
          id: 123,
          name: 'some name',
          notes: 'some notes',
          signOut: null,
          loading: false
        }
      ]
    };
    const { getByText, container } = render(getMockedComponent(overrides));
    expect(container).toBeVisible();
    expect(getByText(/No results found/)).toBeVisible();
  });

  test('renders table rows and respects isFilteredBySignout', () => {
    const overrides = {
      isFilteredBySignout: true,
      data: [
        {
          id: 123,
          name: 'some name',
          notes: 'some notes',
          signOut: null,
          loading: false
        },
        {
          id: 456,
          name: 'stuff',
          notes: 'ok',
          signOut: '2020-03-19T18:17:55.905Z',
          loading: false
        }
      ]
    };
    const { getByText, queryByText, container } = render(
      getMockedComponent(overrides)
    );
    expect(container).toBeVisible();
    overrides.data.forEach(data => {
      if (data.signOut) {
        expect(getByText(data.name)).toBeVisible();
        expect(getByText(data.notes)).toBeVisible();
      } else {
        expect(queryByText(data.name)).toBeNull();
        expect(queryByText(data.notes)).toBeNull();
      }
    });
  });

  test.each([
    [
      {
        id: 123,
        name: 'some name',
        notes: 'some notes',
        signOut: null,
        loading: false
      },
      true
    ],
    [
      {
        id: 123,
        name: 'some name',
        notes: 'some notes',
        signOut: '2020-03-19T18:17:55.905Z',
        loading: false
      },
      false
    ]
  ])('with data=%p, show sign out button=%p', (data, showSignOutButton) => {
    const overrides = {
      data: [data]
    };

    const { getByText, queryByText, container } = render(
      getMockedComponent(overrides)
    );

    expect(container).toBeVisible();

    if (showSignOutButton) {
      expect(getByText(/Sign out/)).toBeVisible();
    } else {
      expect(queryByText(/Sign out/)).toBeNull();
    }
  });

  test.each([
    [
      {
        id: 123,
        name: 'some name',
        notes: 'some notes',
        signOut: null,
        loading: true
      },
      true
    ],
    [
      {
        id: 123,
        name: 'some name',
        notes: 'some notes',
        signOut: null,
        loading: false
      },
      false
    ]
  ])('with data=%p, show loading state=%p', (data, isLoading) => {
    const overrides = {
      data: [data]
    };

    const { getByText, container } = render(getMockedComponent(overrides));

    expect(container).toBeVisible();

    if (isLoading) {
      expect(getByText(/Signing out/)).toBeVisible();
    } else {
      expect(getByText(/Sign out/)).toBeVisible();
    }
  });

  test('signOutVisitor function prop is called when sign out button clicked', async () => {
    const overrides = {
      signOutVisitor: jest.fn(() => Promise.resolve()),
      data: [
        {
          id: 123,
          name: 'some name',
          notes: 'some notes',
          signOut: null,
          loading: false
        }
      ]
    };
    const { container } = render(getMockedComponent(overrides));
    expect(container).toBeVisible();

    const signOutButton = container.querySelector('.sign-out');
    fireEvent.click(signOutButton);

    expect(overrides.signOutVisitor).toBeCalled();
  });
});
