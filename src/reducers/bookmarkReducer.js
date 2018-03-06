import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.bookmarks, action) => {
  switch (action.type) {
    case types.CREATE_BOOKMARK:
      return [
        ...state,
        action.bookmark
      ];
    case types.UPDATE_BOOKMARK:
      return state.map((bookmark) => {
        if (bookmark.id === action.id) {
          return {
            ...bookmark,
            ...action.updates
          }
        } else {
          return bookmark
        }
      });
    case types.REMOVE_BOOKMARK:
      return state.filter(({ id }) => id !== action.id);
    case types.SET_BOOKMARKS:
      return action.bookmarks;
    default:
      return state;
  }
};
