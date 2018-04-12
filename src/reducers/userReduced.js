import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.userData, action) => {
  switch (action.type) {
    case types.SET_USER:
      return { user: action.user };
    default:
      return state;
  }
};
