import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { toBeEmpty, toBeVisible } from '@testing-library/jest-dom';
import NewVisitorDialog from './NewVisitorDialog';

expect.extend({ toBeVisible, toBeEmpty });

const getMockedComponent = (propOverride = {}) => {
  const defaultProps = {
    show: true,
    setShowDialog: () => {},
    addNewVisitor: () => () => {}
  };

  const updatedProps = Object.assign(defaultProps, propOverride);

  return <NewVisitorDialog {...updatedProps} />;
};

describe('<NewVisitorDialog />', () => {
  afterEach(cleanup);

  test('renders without exploding', () => {
    const { container } = render(getMockedComponent());
    expect(container).toBeVisible();
  });

  test.each([
    [{}, false],
    [{ '#first-name': 'Justin' }, false],
    [{ '#first-name': 'Justin', '#last-name': 'Lui' }, false],
    [
      {
        '#first-name': 'Justin',
        '#last-name': 'Lui',
        '#notes': 'software engineer'
      },
      true
    ]
  ])(
    'with formdata=%p, submit handler called=%p',
    async (formData, expectSubmitCalled) => {
      const overrides = {
        addNewVisitor: jest.fn(() => Promise.resolve())
      };
      const { container } = render(getMockedComponent(overrides));
      const form = container.querySelector('form');

      Object.entries(formData).forEach(([selector, value]) => {
        const el = form.querySelector(selector);
        fireEvent.change(el, { target: { value } });
        expect(el.value).toBe(value);
      });

      fireEvent.submit(form);

      if (expectSubmitCalled) {
        expect(overrides.addNewVisitor).toBeCalled();
      } else {
        expect(overrides.addNewVisitor).not.toBeCalled();
      }
    }
  );

  test('setShowDialog is called if dialog is closed', () => {
    const overrides = {
      setShowDialog: jest.fn()
    };
    const { container } = render(getMockedComponent(overrides));
    const closeButton = container.querySelector('.close-button');
    fireEvent.click(closeButton);
    expect(overrides.setShowDialog).toBeCalled();
  });
});
