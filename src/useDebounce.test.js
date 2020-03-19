import { renderHook, act } from '@testing-library/react-hooks';
import useDebounce from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  test('should retain the initial value it set', () => {
    const { result } = renderHook(
      ({ initialValue }) => useDebounce(initialValue, 500),
      {
        initialProps: { initialValue: 'abc' }
      }
    );

    expect(result.current).toBe('abc');
  });

  test('should update with new value after timeout has passed', () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useDebounce(initialValue, 500),
      {
        initialProps: { initialValue: 'abc' }
      }
    );

    rerender({ initialValue: 'def' });
    expect(result.current).toBe('abc');
    act(() => {
      jest.runAllTimers();
      expect(result.current).toBe('def');
    });
  });
});
