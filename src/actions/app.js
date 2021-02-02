export const SET_LOADING = 'SET_LOADING';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_MESSAGE_REDIRECT = 'SET_MESSAGE_REDIRECT';

export const setLoading = (isLoading) => ({ type: SET_LOADING, isLoading });
export const setMessage = (message) => ({ type: SET_MESSAGE, message });
export const setMessageRedirect = (message, path) => ({ type: SET_MESSAGE_REDIRECT, message, path});
