import database from "../firebase/firebase";
import * as types from "./actionTypes";

//-----------------------------------------
// CREATE BOOKMARK FOLDER
//-----------------------------------------

export const createFolder = folder => {
  return {
    type: types.CREATE_FOLDER,
    folder
  };
};

export const startCreateFolder = (folderData = {}) => {
  return (dispatch, getState) => {
    // GET UID FROM FIREBASE AUTH
    const uid = getState().auth.uid;

    // DEFAULT FOLDER STRUCTURE
    const {
      title = "",
      desc = "",
      createdAt = 0,
      updatedAt = 0
    } = folderData;

    const folder = { title, desc, createdAt, updatedAt };

    return database
      .ref(`users/${uid}/folders`)
      .push(folder)
      .then(ref => {
        dispatch(
          createFolder({
            id: ref.key,
            ...folder
          })
        );
        // Returning folder id (ref.key) so we can redirect user to folder when folder is created
        return ref.key
      });
  };
};

//-----------------------------------------
// SET BOOKMARK FOLDERS
//-----------------------------------------

export const setFolders = folders => {
  return {
    type: types.SET_FOLDERS,
    folders
  };
};

export const startSetFolders = () => {
  return (dispatch, getState) => {
    // GET UID FROM FIREBASE AUTH
    const uid = getState().auth.uid;

    // GET ALL USER FOLDERS WITH USER ID
    return database
      .ref(`users/${uid}/folders`)
      .once("value")
      .then(snapshot => {
        const folders = [];
        snapshot.forEach(childSnapshot => {
          folders.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setFolders(folders));
      });
  };
};

//-----------------------------------------
// UPDATE BOOKMARK FOLDER
//-----------------------------------------

export const updateFolder = (id, updates) => ({
  type: types.UPDATE_FOLDER,
  id,
  updates
});

export const startUpdateFolder = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/folders/${id}`)
      .update(updates)
      .then(() => {
        dispatch(updateFolder(id, updates));
      });
  };
};

//-----------------------------------------
// REMOVE BOOKMARK FOLDER
//-----------------------------------------

export const removeFolder = ({ id } = {}) => ({
  type: types.REMOVE_FOLDER,
  id
});

export const startRemoveFolder = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/folders/${id}`)
      .remove()
      .then(() => {
        dispatch(removeFolder({ id }));
      });
  };
};

//-----------------------------------------
//
//-----------------------------------------
