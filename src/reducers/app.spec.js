import reducer from './app.js';
import { setLoading, setMessage, setMessageRedirect } from '../actions/app';

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ confirmMessage: '', confirmMethod: '', isLoading: false, message: '', path: '' });
  });

  it('should handle SET_LOADING when isLoading is true', () => {
    expect(reducer(undefined, setLoading(true))).toEqual({ confirmMessage: '', confirmMethod: '', isLoading: true, message: '', path: '' });
  });

  it('should handle SET_LOADING when isLoading is false', () => {
    expect(reducer(undefined, setLoading(false))).toEqual({ confirmMessage: '', confirmMethod: '', isLoading: false, message: '', path: '' });
  });

  it('should handle SET_MESSAGE', () => {
    const message = 'Hello world';
    expect(reducer(undefined, setMessage(message))).toEqual({ confirmMessage: '', confirmMethod: '', isLoading: false, message, path: '' });
  });

  it('should handle SET_MESSAGE_REDIRECT', () => {
    const message = 'Hello world',
      path = '/dashboard';
    expect(reducer(undefined, setMessageRedirect(message, path))).toEqual({ confirmMessage: '', confirmMethod: '', isLoading: false, message, path });
  });
});
