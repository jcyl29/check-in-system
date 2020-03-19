import React from 'react';
import App from './App';

import { cleanup, render, wait, fireEvent } from '@testing-library/react';
import { FetchMock } from '@react-mock/fetch';
import mockGetVisitors from './mockGetVisitors';
import mockGetVisitorsFiltered from './mockGetVisitorsFiltered';

const getMockedComponent = () => {
  return (
    <FetchMock
      mocks={[
        {
          matcher: new RegExp('/api/entries'),
          method: 'GET',
          response: mockGetVisitors
        },
        {
          matcher: new RegExp('/api/entries?filter[name]='),
          method: 'GET',
          response: mockGetVisitorsFiltered
        },
        {
          matcher: new RegExp('/api/entries'),
          method: 'POST',
          response: {} // the app is not doing anything with the response of the POST, thus this value is not important
        },
        {
          matcher: new RegExp('/api/entries/sign_out'),
          method: 'POST', // the app is not doing anything with the response of the POST, thus this value is not important
          response: {}
        }
      ]}
    >
      <App />
    </FetchMock>
  );
};

describe('<App />', () => {
  afterEach(cleanup);

  test('renders table after fetching visitors', async () => {
    const { getByText, container } = render(getMockedComponent());

    expect(container).toBeVisible();
    expect(getByText(/No results found/)).toBeVisible();

    await wait(() => {
      mockGetVisitors.data.forEach(data => {
        expect(getByText(data.attributes.name)).toBeVisible();
        expect(getByText(data.attributes.notes)).toBeVisible();
      });
    });
  });

  test('filter by signed out checkbox works', async () => {
    const { getByText, queryByText, container } = render(getMockedComponent());

    await wait(() => {
      const filterByCheckbox = container.querySelector('#signed-out');
      fireEvent.click(filterByCheckbox);
    });

    await wait(() => {
      mockGetVisitors.data.forEach(data => {
        if (data.attributes.sign_out) {
          expect(getByText(data.attributes.name)).toBeVisible();
          expect(getByText(data.attributes.notes)).toBeVisible();
        } else {
          expect(queryByText(data.attributes.name)).toBeNull();
          expect(queryByText(data.attributes.notes)).toBeNull();
        }
      });
    });
  });

  test('renders table after searching for specific visitors', async () => {
    const { getByText, container } = render(getMockedComponent());

    expect(container).toBeVisible();

    const searchInput = container.querySelector('#search-visitor');

    fireEvent.change(searchInput, { target: { value: 'justin lui' } });

    await wait(() => {
      mockGetVisitorsFiltered.data.forEach(data => {
        expect(getByText(data.attributes.name)).toBeVisible();
        expect(getByText(data.attributes.notes)).toBeVisible();
      });
    });
  });

  test('adds visitor', async () => {
    const { container } = render(getMockedComponent());

    expect(container).toBeVisible();

    const addVisitorButton = container.querySelector('.add-visitor');
    const dialog = document.querySelector('dialog');
    fireEvent.click(addVisitorButton);

    await wait(() => {
      expect(dialog).toBeVisible();
      fireEvent.change(dialog.querySelector('#first-name'), {
        target: { value: 'new guy' }
      });
      fireEvent.change(dialog.querySelector('#last-name'), {
        target: { value: 'on the block' }
      });
      fireEvent.change(dialog.querySelector('#notes'), {
        target: { value: 'here i come' }
      });
      fireEvent.click(dialog.querySelector('button'));
    });

    await wait(() => {
      expect(dialog).not.toBeVisible();
    });
  });

  test('signs out visitor', async () => {
    const { getByText, container } = render(getMockedComponent());

    expect(container).toBeVisible();

    await wait(() => {
      const signOutButton = container.querySelector('.sign-out');
      fireEvent.click(signOutButton);
      expect(getByText(/Signing out/)).toBeVisible();
    });
  });
});
