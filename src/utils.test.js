import { getLocaleTimeString } from './utils';

describe('getLocaleTimeString', () => {
  test('return correct data for default settings', () => {
    const dateString = '2020-03-19T18:17:55.905Z';
    const result = 'Thursday, March 19, 2020, 6:17:55 PM';
    expect(getLocaleTimeString(dateString)).toBe(result);
  });
});
