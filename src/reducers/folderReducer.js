import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.folders, action) => {
  switch (action.type) {
    case types.CREATE_FOLDER:
      return [
        ...state,
        action.folder
      ];
    case types.REMOVE_FOLDER:
      return state.filter(({ id }) => id !== action.id);
    case types.UPDATE_FOLDER:
      return state.map((folder) => {
        if (folder.id === action.id) {
          return {
            ...folder,
            ...action.updates
          }
        } else {
          return folder
        }
      })
    case types.SET_FOLDERS:
      return action.folders
    default:
      return state;
  }
};
