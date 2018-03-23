import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.filters, action) => {
  switch (action.type) {
    case types.SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text
      };
    case types.SORT_BY_CREATED_AT:
      return {
        ...state,
        sortBy: "createdAt"
      };
    case types.SORT_BY_UPDATED_AT:
      return {
        ...state,
        sortBy: "updatedAt"
      };
    case types.SORT_BY_TITLE:
      return {
        ...state,
        sortBy: "title"
      };
    case types.SORT_BY_DEFAULT:
      return {
        ...state,
        sortBy: "createdAt",
        text: ""
      };
    default:
      return state;
  }
};

