const defaultState = {
  form: {},
};

const form = (state = defaultState, action) => {
  switch (action.type) {
    case "STATUS_FORM_SUCCESS":
      return {
        ...state,
        form: action.data,
      };

    default:
      return state;
  }
};

export default form;
