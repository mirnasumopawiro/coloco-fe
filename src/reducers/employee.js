const defaultState = {
  employee: {},
};

const employee = (state = defaultState, action) => {
  switch (action.type) {
    case "STATUS_EMPLOYEE_SUCCESS":
      return {
        ...state,
        employee: action.data,
      };

    default:
      return state;
  }
};

export default employee;
