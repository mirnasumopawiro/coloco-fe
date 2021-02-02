import { SET_LOADING, SET_MESSAGE, SET_MESSAGE_REDIRECT } from "../actions/app";

const initialState = {
  isLoading: false,
  message: "",
  path: "",
  confirmMessage: "",
  confirmMethod: "",
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    case SET_MESSAGE_REDIRECT:
      return {
        ...state,
        message: action.message,
        path: action.path,
      };
    case "SET_CONFIRM_MESSAGE":
      return {
        ...state,
        confirmMessage: action.confirmMessage,
        confirmMethod: action.confirmMethod,
      };
    default:
      return state;
  }
};

export default app;
