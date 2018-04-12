import database from "../firebase/firebase";
import * as types from "./actionTypes";
import { startRemoveFolder, startUpdateFolder } from "./folderActions";

//-----------------------------------------
// CREATE BOOKMARK
//-----------------------------------------

export const createBookmark = bookmark => {
  return {
    type: types.CREATE_BOOKMARK,
    bookmark
  };
};

export const startCreateBookmark = (bookmarkData = {}, folderId) => {
  return (dispatch, getState) => {
    // GET UID FROM FIREBASE AUTH
    const uid = getState().auth.uid;

    // DEFAULT FOLDER STRUCTURE
    const {
      title = "",
      href = "",
      createdAt = 0,
      folderId = "",
      updatedAt = 0,
      iconURL = ""
    } = bookmarkData;

    const bookmark = { title, href, createdAt, iconURL, updatedAt, folderId };

    return database
      .ref(`users/${uid}/bookmarks/`)
      .push(bookmark)
      .then(ref => {
        dispatch(
          createBookmark({
            id: ref.key,
            ...bookmark
          })
        );
        // Returning folder id of the bookmark so we can redirect user to folder when bookmark created
        return bookmark.folderId;
      });
  };
};

//-----------------------------------------
// REMOVE BOOKMARK
//-----------------------------------------
export const removeBookmark = ({ id } = {}) => ({
  type: "REMOVE_BOOKMARK",
  id
});

export const startRemoveBookmark = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/bookmarks/${id}`)
      .remove()
      .then(() => {
        dispatch(removeBookmark({ id }));
        return "abc";
      });
  };
};

export const startFindFolderBookmarks = id => {
  const bookmarksToRemove = [];
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/bookmarks`)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          if (id === childSnapshot.val().folderId) {
            bookmarksToRemove.push({
              id: childSnapshot.key
            });
          }
        });
        dispatch(startRemoveFolderBookmark(bookmarksToRemove));
        dispatch(startRemoveFolder({ id }));
      });
  };
};

export const startRemoveFolderBookmark = (bookmarksToRemove = []) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    bookmarksToRemove.map(bookmark => {
      return database
        .ref(`users/${uid}/bookmarks/${bookmark.id}`)
        .remove()
        .then(() => {
          dispatch(removeBookmark({ id: bookmark.id }));
        });
    });
  };
};

//-----------------------------------------
// UPDATE BOOKMARK
//-----------------------------------------

export const updateBookmark = (id, updates) => ({
  type: types.UPDATE_BOOKMARK,
  id,
  updates
});

export const startUpdateBookmark = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/bookmarks/${id}`)
      .update(updates)
      .then(() => {
        dispatch(updateBookmark(id, updates));
        // Returning folder id of the bookmark so we can redirect user to folder when bookmark created
        return updates.folderId;
      });
  };
};

//-----------------------------------------
// SET BOOKMARKS
//-----------------------------------------

export const setBookmarks = bookmarks => ({
  type: types.SET_BOOKMARKS,
  bookmarks
});

export const startSetBookmarks = () => {
  return (dispatch, getState) => {
    // GET UID FROM FIREBASE AUTH
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/bookmarks`)
      .once("value")
      .then(snapshot => {
        const bookmarks = [];
        snapshot.forEach(childSnapshot => {
          bookmarks.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setBookmarks(bookmarks));
      });
  };
};
