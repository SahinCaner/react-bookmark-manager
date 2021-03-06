import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import auth from "../reducers/authReducer";
import folders from "../reducers/folderReducer";
import bookmarks from "../reducers/bookmarkReducer";
import filters from "../reducers/filterReducer";
import userData from "../reducers/userReduced";

// REDUX BROWSWER PLUGIN
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth,
      folders,
      bookmarks,
      filters,
      userData
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
