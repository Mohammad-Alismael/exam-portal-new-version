import * as actionTypes from "../actions";

const initialState = {
  sidebarRef: null,
};

const SidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SIDE_BAR_REF:
      return {
        ...state,
        sidebarRef: action.payload.sidebarRef,
      };
    default:
      return state;
  }
};

export default SidebarReducer;
