import * as types from "./actionTypes";

// SET_TEXT_FILTER
export const setTextFilter = (text = "") => ({
  type: types.SET_TEXT_FILTER,
  text
});

// SORT_BY_CREATED_DATE
export const sortByCreatedAt = () => ({
  type: types.SORT_BY_CREATED_AT
});

// SORT_BY_UPDATED_DATE
export const sortByUpdatedAt = () => ({
  type: types.SORT_BY_UPDATED_AT
});

// SORT_BY_TITLE
export const sortByTitle = () => ({
  type: types.SORT_BY_TITLE
});

// SORT_BY_DEFAULT
export const sortByDefault = (text = "") => ({
  type: types.SORT_BY_DEFAULT,
  text
});
