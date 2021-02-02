const defaultState = {
  sidebar: "responsive",
};

const sidebar = (state = defaultState, action) => {
  switch (action.type) {
    case "set":
      return {
        ...state,
        sidebar: action.data,
      };
    default:
      return state;
  }
};

export default sidebar;
