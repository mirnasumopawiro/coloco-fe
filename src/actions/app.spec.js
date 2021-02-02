import {
  setLoading,
  SET_LOADING
} from './app.js';
import { SET_MESSAGE, setMessage, SET_MESSAGE_REDIRECT, setMessageRedirect } from './app.js';

describe('app action test', () => {
  it('should create an action to set isLoading', () => {
    const isLoading = true;
    const expectedAction = {
      type: SET_LOADING,
      isLoading
    };
    expect(setLoading(isLoading)).toEqual(expectedAction);
  });

  it('should create an action to set message', () => {
    const message = 'Testing message';
    const expectedAction = {
      type: SET_MESSAGE,
      message
    };
    expect(setMessage(message)).toEqual(expectedAction);
  });

  it('should create an action to set message and redirect path', () => {
    const message = 'You will be redirected to home';
    const path = '/dashboard';
    const expectedAction = {
      type: SET_MESSAGE_REDIRECT,
      message,
      path
    };
    expect(setMessageRedirect(message, path)).toEqual(expectedAction);
  });
});
